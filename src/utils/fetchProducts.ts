import { Product } from "@/types/product"
import { AppError, UnauthorizedError, NotFoundError, ServerError, handleError } from './errors'

const normalizeToArray = <T>(data: any): T[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") return [data];
  return [];
}

type CreateProductData = {
  name: string
  slug?: string
  description?: string | string[]
  img?: string
  images?: string
  price: number | string
  stock: number
  categoryId: number
  brand?: string | { id: string; name: string }
  sizes?: string[] | { id: string; name: string; value: string }[]
  colors?: string[] | { id: string; name: string; value: string }[]
  isActive?: boolean
  specs?: unknown[]
  variants?: unknown[]
}

type ProductSpecData = { specs: unknown[] }
type ProductVariantData = { variants: unknown[] }

type FilterData = {
  name?: string
  minPrice?: number
  maxPrice?: number
  categoryId?: number
  sortBy?: string
  sortOrder?: string
  page?: number
  limit?: number
}

const API_URL = "/api/products"

const getUrl = (path = ""): string => {
  return `${API_URL}${path}`
}

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

const createHeaders = (includeAuth = true): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  if (includeAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

const safeJsonParse = async (response: Response): Promise<any> => {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new ServerError("JSON cavab gözlənilirdi")
  }
}

const normalizeId = (id: string | number) => ({
  numId: Number(id),
  strId: String(id)
})

const normalizeDescription = (description?: string | string[]): string[] => {
  if (Array.isArray(description)) return description
  return description ? [String(description).trim()] : []
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(getUrl(""), { 
      method: "GET",
      headers: createHeaders(false)
    })
    if (!response.ok) {
      throw new ServerError(`Məhsullar yüklənmədi: ${response.status}`)
    }
    const data = await safeJsonParse(response)
    return normalizeToArray<Product>(data)
  } catch (err) {
    throw handleError(err)
  }
}

export const getProductById = async (id: string | number): Promise<Product | null> => {
  try {
    const response = await fetch(getUrl(`/${id}`), { 
      method: "GET",
      headers: createHeaders(false)
    })
    
    if (!response.ok) {
      const allProducts = await getProducts()
      const { numId, strId } = normalizeId(id)
      
      const foundProduct = allProducts.find(p => {
        const productId = typeof p.id === 'number' ? p.id : Number(p.id)
        return productId === numId || String(p.id) === strId
      })
      
      return foundProduct || null
    }
    
    const data = await safeJsonParse(response)
    
    if (data && (data.error || data.statusCode || data.message === 'User is not found')) {
      const allProducts = await getProducts()
      const { numId, strId } = normalizeId(id)
      
      const foundProduct = allProducts.find(p => {
        const productId = typeof p.id === 'number' ? p.id : Number(p.id)
        return productId === numId || String(p.id) === strId
      })
      
      return foundProduct || null
    }
    
    return data
  } catch (err) {
    throw handleError(err)
  }
}

export const createProduct = async (data: CreateProductData): Promise<Product | null> => {
  try {
    if (!data.categoryId) throw new ServerError("categoryId məcburidir")

    const { categoryId, specs, variants, description, ...rest } = data
    const body = {
      ...rest,
      description: normalizeDescription(description),
    }

    const response = await fetch(`/api/products/category/${categoryId}`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      if (response.status === 401) throw new UnauthorizedError('Giriş tələb olunur')
      throw new ServerError('Məhsul yaradılmadı')
    }
    
    return await safeJsonParse(response)
  } catch (err) {
    throw handleError(err)
  }
}

export const createProductSpecs = async (
  productId: number,
  { specs }: ProductSpecData
): Promise<unknown[] | null> => {
  try {
    const url = `/api/products/${productId}/specs`
    const results = await Promise.all(
      specs.map(async spec => {
        const response = await fetch(url, {
          method: "POST",
          headers: createHeaders(),
          body: JSON.stringify(spec),
        })
        if (!response.ok) {
          throw new ServerError('Specs yaradılmadı')
        }
        return await safeJsonParse(response)
      })
    )
    return results
  } catch (err) {
    throw handleError(err)
  }
}

export const createProductVariants = async (
  productId: number,
  { variants }: ProductVariantData
): Promise<unknown[] | null> => {
  try {
    const url = `/api/products/${productId}/variants`
    const results = await Promise.all(
      variants.map(async variant => {
        const response = await fetch(url, {
          method: "POST",
          headers: createHeaders(),
          body: JSON.stringify(variant),
        })
        if (!response.ok) {
          throw new ServerError('Variants yaradılmadı')
        }
        return await safeJsonParse(response)
      })
    )
    return results
  } catch (err) {
    throw handleError(err)
  }
}

export const updateProduct = async (
  id: string | number,
  data: Partial<Product>
): Promise<Product | null> => {
  try {
    console.log(`[updateProduct] Updating product ${id}:`, data)
    
    // Try PUT first
    let response = await fetch(getUrl(`/${id}`), {
      method: "PUT",
      headers: createHeaders(),
      body: JSON.stringify(data),
    })
    
    console.log(`[updateProduct] PUT response status: ${response.status}`)
    
    // If PUT fails with 404, try POST as fallback
    if (response.status === 404) {
      console.log('[updateProduct] PUT failed with 404, trying POST for product update...')
      response = await fetch(getUrl(`/${id}`), {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(data),
      })
      console.log(`[updateProduct] POST response status: ${response.status}`)
    }
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[updateProduct] Error response: ${response.status}`, errorText)
      if (response.status === 401) throw new UnauthorizedError('Giriş tələb olunur')
      if (response.status === 404) throw new NotFoundError('Məhsul tapılmadı')
      throw new ServerError(`Məhsul yenilənmədi (${response.status}): ${errorText}`)
    }
    
    return await safeJsonParse(response)
  } catch (err) {
    console.error('[updateProduct] Exception:', err)
    throw handleError(err)
  }
}

export const deleteProduct = async (id: string | number): Promise<boolean> => {
  try {
    const response = await fetch(getUrl(`/${id}`), { 
      method: "DELETE",
      headers: createHeaders()
    })
    
    if (!response.ok) {
      if (response.status === 401) throw new UnauthorizedError('Giriş tələb olunur')
      if (response.status === 404) throw new NotFoundError('Məhsul tapılmadı')
      throw new ServerError('Məhsul silinmədi')
    }
    
    return true
  } catch (err) {
    throw handleError(err)
  }
}

export const filterProducts = async (filters: FilterData): Promise<Product[]> => {
  try {
    const response = await fetch(getUrl("/filter"), {
      method: "POST",
      headers: createHeaders(false),
      body: JSON.stringify(filters),
    })
    
    if (!response.ok) {
      throw new ServerError('Filtrasiya uğursuz oldu')
    }
    
    const data = await safeJsonParse(response)
    return normalizeToArray<Product>(data)
  } catch (err) {
    throw handleError(err)
  }
}

export const getFilteredProducts = async (filters: FilterData): Promise<Product[]> => {
  try {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null) params.append(key, String(val))
    })

    const url = params.toString() ? getUrl(`?${params}`) : getUrl()
    const response = await fetch(url, { 
      method: "GET",
      headers: createHeaders(false)
    })
    
    if (!response.ok) {
      throw new ServerError('Məhsullar yüklənmədi')
    }
    
    const data = await safeJsonParse(response)
    return normalizeToArray<Product>(data)
  } catch (err) {
    throw handleError(err)
  }
}