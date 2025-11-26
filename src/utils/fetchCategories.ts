import { AppError, UnauthorizedError, NotFoundError, ServerError, handleError } from './errors'

const API_URL = '/api/category'
const REQUEST_TIMEOUT = 10000
const MAX_RETRIES = 3

const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

const createHeaders = (includeAuth = true): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  if (includeAuth) {
    const token = getToken()
    if (token) headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

const safeJsonParse = async (response: Response): Promise<any> => {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new ServerError("JSON cavab gözlənilirdi")
  }
}

const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn()
  } catch (error: any) {
    if (retries > 0) {
      if (error?.response?.status && error.response.status >= 400 && error.response.status < 500) {
        throw error
      }
      await new Promise(resolve => setTimeout(resolve, delay))
      return retryRequest(requestFn, retries - 1, delay * 2)
    }
    throw error
  }
}

const extractCategories = (data: any): any[] => {
  if (Array.isArray(data)) return data
  if (data?.categories && Array.isArray(data.categories)) return data.categories
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.id) return [data]
  return []
}

export const fetchCategories = async () => {
  return retryRequest(async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
      
      const response = await fetch(`${API_URL}/find`, {
        signal: controller.signal,
        headers: createHeaders(false),
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new ServerError(`Kateqoriyalar yüklənmədi: ${response.status}`)
      }
      const data = await response.json()
      return extractCategories(data)
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new ServerError('Request timeout')
      }
      throw handleError(error)
    }
  })
}

export const deleteCategory = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/${id}/categoryId`, { 
      method: 'DELETE',
      headers: createHeaders()
    })
    
    if (!response.ok) {
      const data = await safeJsonParse(response)
      if (response.status === 401) {
        throw new UnauthorizedError('Giriş tələb olunur')
      }
      if (response.status === 404) {
        throw new NotFoundError('Kateqoriya tapılmadı')
      }
      throw new ServerError(data.message || 'Silmə uğursuz oldu')
    }
    
    return await safeJsonParse(response)
  } catch (error) {
    throw handleError(error)
  }
}

export const createCategory = async (categoryData: {
  name: string | {
    az: string
    en: string
    ru: string
  }
  slug: string
  imageUrl?: string
  parentId?: string | null
}) => {
  try {
    const processedData = {
      ...categoryData,
      name: typeof categoryData.name === 'string' 
        ? categoryData.name 
        : (categoryData.name.az || categoryData.name.en || categoryData.name.ru || '')
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(processedData),
    })
    
    if (!response.ok) {
      const data = await safeJsonParse(response)
      if (response.status === 401) {
        throw new UnauthorizedError('Giriş tələb olunur')
      }
      throw new ServerError(data.message || 'Kateqoriya yaradılmadı')
    }
    
    return await safeJsonParse(response)
  } catch (error) {
    throw handleError(error)
  }
}

export const searchCategories = async (params: Record<string, string>) => {
  try {
    const query = new URLSearchParams(params).toString()
    const response = await fetch(`${API_URL}/find?${query}`, {
      headers: createHeaders(false)
    })
    
    if (!response.ok) {
      const data = await safeJsonParse(response)
      throw new ServerError(data.message || 'Axtarış uğursuz oldu')
    }
    
    return await safeJsonParse(response)
  } catch (error) {
    throw handleError(error)
  }
}

export const filterCategories = async (params: Record<string, string>) => {
  try {
    const query = new URLSearchParams(params).toString()
    const response = await fetch(`${API_URL}/filter?${query}`, {
      headers: createHeaders(false)
    })
    
    if (!response.ok) {
      const data = await safeJsonParse(response)
      throw new ServerError(data.message || 'Filtrasiya uğursuz oldu')
    }
    
    return await safeJsonParse(response)
  } catch (error) {
    throw handleError(error)
  }
}

export const updateCategory = async (categoryId: string, categoryData: any) => {
  try {
    const response = await fetch(`${API_URL}/${categoryId}/categoryId`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(categoryData),
    })
    
    if (!response.ok) {
      const data = await safeJsonParse(response)
      if (response.status === 401) {
        throw new UnauthorizedError('Giriş tələb olunur')
      }
      if (response.status === 404) {
        throw new NotFoundError('Kateqoriya tapılmadı')
      }
      throw new ServerError(data.message || 'Yeniləmə uğursuz oldu')
    }
    
    return await safeJsonParse(response)
  } catch (error) {
    throw handleError(error)
  }
}
