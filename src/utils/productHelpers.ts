import type { Product } from "@/types/product"

export interface ProductPriceInfo {
  priceNumber: number
  discountNumber: number
  effectiveDiscount: number
  hasDiscount: boolean
  discountedPrice: number
}

export function getProductImage(product: Product): string {
  return product.imageUrl || product.images || product.img || ""
}

export function calculateProductPrice(product: Product): ProductPriceInfo {
  const primaryVariant = product.variants?.[0]
  const priceNumber = Number(primaryVariant?.price ?? product.price) || 0
  const discountNumber = Number(product.discount ?? 0)
  const variantDiscountNumber = Number(primaryVariant?.discount ?? 0)
  const effectiveDiscount = discountNumber > 0 ? discountNumber : variantDiscountNumber
  const hasDiscount = effectiveDiscount > 0
  const discountedPrice = hasDiscount
    ? (priceNumber * (100 - effectiveDiscount)) / 100
    : priceNumber

  return {
    priceNumber,
    discountNumber,
    effectiveDiscount,
    hasDiscount,
    discountedPrice
  }
}

export function isProductNew(product: Product, latestDays: number = 7): boolean {
  if (product.isNew) return true
  
  const dateString = product.createdAt || product.date
  if (!dateString) return false
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return false
    const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= latestDays
  } catch {
    return false
  }
}

export function validateProduct(product: Product): boolean {
  return Boolean(product.id)
}
