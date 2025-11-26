"use client"
import React, { useState, useEffect } from "react"
import { getProducts, deleteProduct } from "@/utils/fetchProducts"
import { fetchCategories, deleteCategory } from "@/utils/fetchCategories"
import { category } from "@/types/category"
import { Product } from "@/types/product"
import { useToast } from "@/components/ui/toast"
import { handleError } from "@/utils/errors"

const Page = () => {
  const { showToast } = useToast()
  const [categories, setCategories] = useState<category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const getStringValue = (field: string | { az?: string; en?: string; ru?: string } | undefined): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field.az || field.en || field.ru || ''
  }

  const getLocalizedCategoryName = (category: category): string => {
    if (typeof category.name === 'string') return category.name;
    if (typeof category.name === 'object' && category.name !== null) {
      return category.name.az || category.name.en || category.name.ru || '';
    }
    return '';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          fetchCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        const appError = handleError(error)
        showToast('error', 'Xəta', appError.message)
      }
    }
    fetchData()
  }, [])

  const handleDeleteCategory = async (id: string | number, categoryName: string) => {
    if (!window.confirm(`"${categoryName}" kateqoriyasını silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.`)) {
      return
    }

    setLoading(true)

    try {
      const result = await deleteCategory(id)
      if (result !== null) {
        setCategories(categories.filter(c => c.id !== id))
        setProducts(products.filter(p => p.category?.id !== Number(id)))
        showToast('success', 'Uğurlu əməliyyat', `"${categoryName}" kateqoriyası uğurla silindi`)
      } else {
        showToast('error', 'Xəta', 'Kateqoriya silinərkən xəta baş verdi')
      }
    } catch (error) {
      const appError = handleError(error)
      showToast('error', 'Xəta', appError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" məhsulunu silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.`)) {
      return
    }

    setLoading(true)

    try {
      const result = await deleteProduct(id)
      if (result !== null) {
        setProducts(products.filter(p => p.id !== id))
        showToast('success', 'Uğurlu əməliyyat', `"${name}" məhsulu uğurla silindi`)
      } else {
        showToast('error', 'Xəta', 'Məhsul silinərkən xəta baş verdi')
      }
    } catch (error) {
      const appError = handleError(error)
      showToast('error', 'Xəta', appError.message)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Silin</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Məhsul və kateqoriyalarınızı silin</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
            </svg>
            Yenilə
          </button>
        </div>{loading && (
          <div className="mb-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm sm:text-base">Yüklənir...</p>
          </div>
        )}<section id="categories" className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Kateqoriyalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{getLocalizedCategoryName(category)}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Slug: {category.slug}</p>
                </div>
                <button
                  onClick={() => handleDeleteCategory(category.id, getLocalizedCategoryName(category))}
                  disabled={loading}
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">Heç bir kateqoriya tapılmadı</p>
          )}
        </section><section id="products" className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Məhsullar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{getStringValue(product.name)}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Qiymət: {product.price}₼</p>
                  <p className="text-xs sm:text-sm text-gray-600">Stok: {product.stock}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Kateqoriya: {product.category ? (typeof product.category.name === 'string' ? product.category.name : (product.category.name.az || product.category.name.en || product.category.name.ru || 'N/A')) : 'N/A'}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id, getStringValue(product.name))}
                  disabled={loading}
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">Heç bir məhsul tapılmadı</p>
          )}
        </section>

      </div>
    </div>
  )
}

export default Page

