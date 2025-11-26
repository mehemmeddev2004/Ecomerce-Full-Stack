"use client"
import React from "react"

interface VariantSpec {
  key: string
  value: string
}

interface Variant {
  slug: string
  name?: string // Add name field for slug generation
  price: number
  stock: number
  discount?: number
  images?: string[]
  specs: VariantSpec[]
  isDefault?: boolean
}

interface VariantsFormProps {
  variants: Variant[]
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>
  productName: string // Add this prop
  isMainVariant?: boolean
}

const VariantsForm: React.FC<VariantsFormProps> = ({ 
  variants, 
  setVariants,
  productName,
  isMainVariant = false 
}) => {
  // Create default variant on mount if none exists
  React.useEffect(() => {
    if (variants.length === 0) {
      setVariants([{
        slug: "",
        price: 0,
        stock: 0,
        discount: 0,
        images: [],
        specs: [],
        isDefault: true
      }])
    }
  }, [])

  const addVariant = () => {
    setVariants([...variants, {
      slug: "",
      price: 0,
      stock: 0,
      discount: 0,
      images: [],
      specs: [{ key: "", value: "" }],
      isDefault: false
    }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  // Update generateSlug to use product name
  const generateSlug = (specs: VariantSpec[]): string => {
    const baseSlug = productName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const specSlug = specs
      .map(spec => spec.value.toLowerCase())
      .filter(Boolean)
      .join('-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50)

    return specSlug ? `${baseSlug}-${specSlug}` : baseSlug
  }

  const validateVariant = (variant: Variant, index: number): boolean => {
    if (!variant.price || variant.price <= 0) return false
    if (!variant.stock || variant.stock < 0) return false
    if (!variant.specs || variant.specs.length === 0) return false
    return true
  }

  const updateVariant = (index: number, field: string, value: string | number) => {
    const updated = [...variants]
    updated[index] = { ...updated[index], [field]: value }

    // Auto-generate slug when specs change
    if (field === 'specs') {
      const newSlug = generateSlug(updated[index].specs)
      updated[index].slug = newSlug

      // Handle duplicate slugs
      const isDuplicate = variants.some((v, i) => i !== index && v.slug === newSlug)
      if (isDuplicate) {
        updated[index].slug = `${newSlug}-${index + 1}`
      }
    }

    setVariants(updated)
  }

  const addVariantSpec = (variantIndex: number) => {
    const updated = [...variants]
    updated[variantIndex].specs.push({ key: "", value: "" })
    setVariants(updated)
  }

  const removeVariantSpec = (variantIndex: number, specIndex: number) => {
    const updated = [...variants]
    updated[variantIndex].specs = updated[variantIndex].specs.filter((_, i) => i !== specIndex)
    setVariants(updated)
  }

  const updateVariantSpec = (variantIndex: number, specIndex: number, field: string, value: string) => {
    const updated = [...variants]
    updated[variantIndex].specs[specIndex] = { 
      ...updated[variantIndex].specs[specIndex], 
      [field]: value 
    }

    // Update slug when specs change
    updated[variantIndex].slug = generateSlug(updated[variantIndex].specs)
    
    setVariants(updated)
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">
          {variants.length <= 1 ? "Əsas Məhsul" : "Məhsul Variantları"}
        </h4>
        {!isMainVariant && (
          <button
            type="button"
            onClick={addVariant}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            + Variant əlavə et
          </button>
        )}
      </div>

      <div className="space-y-4">
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-medium text-gray-700">Variant {variantIndex + 1}</h5>{!variant.isDefault && variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Sil
                </button>
              )}
            </div><div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-gray-600">Xüsusiyyətlər</label>
                <button
                  type="button"
                  onClick={() => addVariantSpec(variantIndex)}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  + Xüsusiyyət əlavə et
                </button>
              </div>
              
              {variant.specs.map((spec, specIndex) => (
                <div key={specIndex} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="color, size"
                    value={spec.key}
                    onChange={(e) => updateVariantSpec(variantIndex, specIndex, 'key', e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="red, large"
                    value={spec.value}
                    onChange={(e) => updateVariantSpec(variantIndex, specIndex, 'value', e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {variant.specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantSpec(variantIndex, specIndex)}
                      className="text-red-500 hover:text-red-700 text-xs px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div><div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Slug (avtomatik/manual) *
              </label>
              <input
                type="text"
                value={variant.slug}
                onChange={(e) => updateVariant(variantIndex, 'slug', e.target.value)}
                placeholder="variant-slug"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Yalnız kiçik hərflər, rəqəmlər və tire (-). Max 50 simvol.
              </p>
            </div><div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Qiymət (₼) *</label>
                <input
                  type="number"
                  placeholder="29.99"
                  value={variant.price}
                  onChange={(e) => updateVariant(variantIndex, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Stok *</label>
                <input
                  type="number"
                  placeholder="10"
                  value={variant.stock}
                  onChange={(e) => updateVariant(variantIndex, 'stock', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Endirim (%)</label>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => updateVariant(variantIndex, 'discount', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VariantsForm

