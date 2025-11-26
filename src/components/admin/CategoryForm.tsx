"use client"
import React, { useState } from "react"
import { category, LocalizedText } from "@/types/category"
import { useTranslation } from "@/contexts/LocaleContext"

interface CategoryFormProps {
  show: boolean
  onClose: () => void
  onSubmit: () => Promise<{ success: boolean; message: string }>
  newCategory: {
    name: {
      az: string;
      en: string;
      ru: string;
    };
    slug: string;
    img: string;
    parentId: string;
  }
  setNewCategory: React.Dispatch<React.SetStateAction<{
    name: {
      az: string;
      en: string;
      ru: string;
    };
    slug: string;
    img: string;
    parentId: string;
  }>>
  categories: category[]
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  show,
  onClose,
  onSubmit,
  newCategory,
  setNewCategory,
  categories
}) => {
  const { locale } = useTranslation();
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const getLocalizedName = (category: category): string => {
    if (typeof category.name === 'string') return category.name;
    return category.name[locale] || category.name.az || '';
  };

  const handleSubmit = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setMessage(null)
    
    try {
      const result = await onSubmit()
      
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      })
      
      if (result.success) {
        setTimeout(() => {
          onClose()
          setMessage(null)
        }, 1500)
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Bilinməyən xəta baş verdi!'
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!show) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md rounded-2xl shadow-e2xl z-50">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Yeni Kateqoriya</h3>
          <p className="text-sm text-gray-600 mt-1">Kateqoriya məlumatlarını daxil edin</p>
          
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                  </svg>
                )}
                {message.text}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya adı *</label>
            <input 
              type="text" 
              placeholder="Geyim" 
              value={newCategory.name.az} 
              onChange={(e) => setNewCategory({ 
                ...newCategory, 
                name: { ...newCategory.name, az: e.target.value } 
              })} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input 
              type="text" 
              placeholder="geyim" 
              value={newCategory.slug} 
              onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Şəkil URL</label>
            <input 
              type="text" 
              placeholder="https://example.com/category.jpg" 
              value={newCategory.img} 
              onChange={(e) => setNewCategory({ ...newCategory, img: e.target.value })} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ana Kateqoriya</label>
            <select 
              value={newCategory.parentId} 
              onChange={(e) => setNewCategory({ ...newCategory, parentId: e.target.value })} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
            >
              <option value="">Yoxdur</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{getLocalizedName(c)}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Ləğv et
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isSubmitting ? 'Əlavə edilir...' : 'Əlavə et'}
          </button>
        </div>
      </div>
    </>
  )
}

export default CategoryForm

