import { useState } from "react"
import { fetchCategories, createCategory } from "@/utils/fetchCategories"
import { category } from "@/types/category"
import { AppError, handleError } from "@/utils/errors"

export const useCategory = () => {
  const [categories, setCategories] = useState<category[]>([])
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: {
      az: "",
      en: "",
      ru: ""
    },
    slug: "",
    img: "",
    parentId: ""
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const categoriesData = await fetchCategories()
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      const appError = handleError(error)
      setError(appError.message)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (): Promise<{ success: boolean; message: string }> => {
    if (!newCategory.name.az.trim()) {
      return { success: false, message: "Kateqoriya adı məcburidir!" }
    }

    const existingCategory = categories.find(cat => {
      const catName = typeof cat.name === 'string' ? cat.name : cat.name.az
      return catName.toLowerCase() === newCategory.name.az.trim().toLowerCase() ||
             cat.slug === (newCategory.slug.trim() || newCategory.name.az.toLowerCase().replace(/\s+/g, "-"))
    })

    if (existingCategory) {
      return { success: false, message: `"${newCategory.name.az}" kateqoriyası artıq mövcuddur!` }
    }
    
    try {
      const categoryData = {
        name: newCategory.name.az.trim(),
        slug: newCategory.slug.trim() || newCategory.name.az.toLowerCase().replace(/\s+/g, "-"),
        imageUrl: newCategory.img || "https://res.cloudinary.com/.../image.jpg",
        parentId: newCategory.parentId || null
      }
      
      const result = await createCategory(categoryData)
      
      if (result && result.id) {
        await loadCategories()
        setNewCategory({
          name: { az: "", en: "", ru: "" },
          slug: "", 
          img: "",
          parentId: ""
        })
        setShowCategoryForm(false)
        return { success: true, message: "Kateqoriya uğurla əlavə edildi!" }
      }
      return { success: false, message: "Kateqoriya əlavə edilmədi" }
    } catch (error) {
      const appError = handleError(error)
      if (appError.message?.includes("already exists") || appError.message?.includes("mövcuddur")) {
        return { success: false, message: "Bu kateqoriya artıq mövcuddur!" }
      }
      return { success: false, message: appError.message }
    }
  }

  return {
    categories,
    setCategories,
    showCategoryForm,
    setShowCategoryForm,
    newCategory,
    setNewCategory,
    loadCategories,
    handleAddCategory,
    loading,
    error
  }
}
