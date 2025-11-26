"use client"
import { useState, useEffect } from 'react'
import { getProducts } from '@/utils/fetchProducts'
import { fetchCategories } from '@/utils/fetchCategories'

export default function AdminHomePage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    loading: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          fetchCategories(),
        ])
        setStats({
          products: Array.isArray(productsData) ? productsData.length : 0,
          categories: Array.isArray(categoriesData) ? categoriesData.length : 0,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto"><div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Admin Paneli
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Xidmətləri idarə etmək üçün yan menyudan seçim edin.
          </p>
        </div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-blue-100">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Məhsullar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : stats.products}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-green-100">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Kateqoriyalar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stats.loading ? '...' : stats.categories}
                </p>
              </div>
            </div>
          </div>
        </div><div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Xoş gəlmisiniz!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Admin panelində məhsullar və kateqoriyalar idarə edə bilərsiniz.
            </p>
          </div>
        </div><div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-green-100">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">Yarat</h3>
                <p className="text-xs sm:text-sm text-gray-600">Yeni məhsul əlavə et</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-blue-100">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">Redaktə et</h3>
                <p className="text-xs sm:text-sm text-gray-600">Məhsulları yenilə</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-red-100">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">Sil</h3>
                <p className="text-xs sm:text-sm text-gray-600">Məhsulları sil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
