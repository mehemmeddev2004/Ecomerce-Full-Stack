import { useState } from "react"
import { getProducts, createProduct, createProductSpecs, createProductVariants } from "@/utils/fetchProducts"
import { Product } from "@/types/product"
import { Variant, VariantSpec } from "@/types/variant"
import { category } from "@/types/category"
import { handleError } from "@/utils/errors"

interface ProductData {
  name: string
  slug: string
  description: string
  img: string
  price: number
  stock: number
  category: string
}

export const useProduct = () => {
  const [products, setProducts] = useState<any[]>([])
  const [showProductForm, setShowProductForm] = useState<boolean>(false)
  const [newProduct, setNewProduct] = useState<ProductData>({
    name: "",
    slug: "",
    description: "",
    img: "",
    price: 0,
    stock: 0,
    category: ""
  })

  const [productSpecs, setProductSpecs] = useState<any[]>([ { key: "", name: "", values: [{ key: "", value: "" }] } ])
  const [productVariants, setProductVariants] = useState<any[]>([ { slug: "", price: 0, stock: 0, discount: 0, images: [], specs: [] } ])

  const loadProducts = async () => {
    try {
      const productsData = await getProducts() as any[]
      setProducts(productsData)
    } catch (error) {
      const appError = handleError(error)
      throw appError
    }
  }

  const validateProduct = (productData: any, variants: any[] = []): boolean => {
    if (!productData.name.trim()) {
      throw new Error("Məhsul adı məcburidir!")
    }
    if (!productData.category.trim()) {
      throw new Error("Kateqoriya seçilməlidir!")
    }
    // Check if at least one variant has a valid price
    if (variants.length === 0) {
      throw new Error("Ən azı bir variant əlavə etməlisiniz!")
    }
    const hasValidPrice = variants.some((v: any) => v.price && v.price > 0)
    if (!hasValidPrice) {
      throw new Error("Ən azı bir variantın qiyməti 0-dan böyük olmalıdır!")
    }
    return true
  }

  const findCategory = (categories: any[], categoryName: string) => {
    return categories.find((cat: any) => {
      if (typeof cat.name === 'string') {
        return cat.name === categoryName
      }
      if (typeof cat.name === 'object' && cat.name !== null) {
        return (cat.name.az === categoryName || cat.name.en === categoryName || cat.name.ru === categoryName)
      }
      return false
    })
  }

  const prepareSpecs = (specsData: any[]) => {
    return specsData.filter((spec: any) => spec.key.trim() && spec.name.trim() && spec.values.length > 0)
      .map((spec: any) => ({
        key: spec.key.trim(),
        name: spec.name.trim(),
        values: spec.values.filter((val: any) => val.key.trim() && val.value.trim())
      }))
  }

  const prepareVariants = (variantsData: any[]) => {
    return variantsData.filter((variant: any) => variant.slug.trim() && variant.price > 0 && variant.stock >= 0)
      .map((variant: any) => ({
        slug: variant.slug.trim(),
        price: variant.price,
        stock: variant.stock,
        discount: variant.discount,
        images: variant.images || [],
        specs: variant.specs.filter((spec: any) => spec.key.trim() && spec.value.trim())
      }))
  }

  const generateSlug = (productData: ProductData): string => {
    const base = productData.slug.trim() || productData.name
    const normalized = base.split('?')[0].split('#')[0]
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    return `${normalized}-${Date.now()}`
  }

  const resetForms = () => {
    setNewProduct({ name: "", slug: "", description: "", img: "", price: 0, stock: 0, category: "" })
    setProductSpecs([ { key: "", name: "", values: [{ key: "", value: "" }] } ])
    setProductVariants([ { slug: "", price: 0, stock: 0, discount: 0, images: [], specs: [] } ])
    setShowProductForm(false)
  }

  const handleAddProduct = async (categories: any[], data?: { product: ProductData, specs: any[], variants: any[] }) => {
    const productData = data?.product || newProduct
    const specsData = data?.specs || productSpecs
    const variantsData = data?.variants || productVariants

    try {
      if (!validateProduct(productData, variantsData)) {
        return false
      }

      const selectedCategory = findCategory(categories, productData.category)
      if (!selectedCategory) {
        throw new Error(`"${productData.category}" kateqoriyası tapılmadı!`)
      }

      const validSpecs = prepareSpecs(specsData)
      const validVariants = prepareVariants(variantsData)
      const uniqueSlug = generateSlug(productData)

      const productOnlyData = {
        name: productData.name.trim(),
        slug: uniqueSlug,
        description: productData.description.trim() || "Məhsul təsviri",
        img: productData.img || "https://via.placeholder.com/400x400?text=No+Image",
        price: validVariants.length > 0 ? validVariants[0].price : productData.price,
        stock: validVariants.length > 0 ? validVariants[0].stock : productData.stock
      }

      const result = await createProduct({ ...productOnlyData, categoryId: parseInt(selectedCategory.id, 10) }) as any
      
      if (!result) {
        throw new Error("Məhsul yaradılmadı")
      }
      
      const createdProduct = result.product || result
      if (!createdProduct.id) {
        throw new Error("Məhsul ID-si alınmadı")
      }
      
      const productId = createdProduct.id

      if (validSpecs.length) {
        await createProductSpecs(productId, { specs: validSpecs })
      }

      if (validVariants.length) {
        await createProductVariants(productId, { variants: validVariants })
      }

      await loadProducts()
      resetForms()
      return true
    } catch (error: any) {
      console.error("Product creation error:", error)
      const appError = handleError(error)
      throw appError
    }
  }

  return {
    products,
    setProducts,
    showProductForm,
    setShowProductForm,
    newProduct,
    setNewProduct,
    productSpecs,
    setProductSpecs,
    productVariants,
    setProductVariants,
    loadProducts,
    handleAddProduct
  }
}
