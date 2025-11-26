'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { getTranslated } from '@/utils/translateProduct'
import type { Product } from '@/types/product'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import ProductGallery from '@/components/ui/product/ProductGallery'
import RandomProduct from '@/components/ui/product/RandomProduct'
import { ProductTab, ProductSpecKey, COLOR_MAP, PRODUCT_CONSTANTS } from '@/constants/product'

interface ProductContentProps {
  product: Product
  galleryImages: Array<{ id: string; url: string }>
  mainImage: string
}

export default function ProductContent({ product, galleryImages, mainImage }: ProductContentProps) {
  const { t, locale } = useTranslation()
  const currentSlug = usePathname()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ProductTab>(ProductTab.DESCRIPTION)
  const [isLoading, setIsLoading] = useState(true)
  
  const productName = getTranslated(product.name, locale)
  const productDescription = getTranslated(product.description, locale)

  useEffect(() => {
    if (product) {
      setIsLoading(false)
    }
  }, [product])

  const tabItems = [
    { key: ProductTab.DESCRIPTION, label: t('product.description') },
    { key: ProductTab.SIZING, label: t('product.sizing') },
    { key: ProductTab.SHIPPING, label: t('product.shipping') },
    { key: ProductTab.RETURNS, label: t('product.returns') }
  ]

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size)
  }

  if (isLoading) {
    return (
     <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-1 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('product.productsLoading')}</p>
          </div>
        </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full h-[30px] mb-[30px]">
        <p className="text-sm text-gray-600">
          {t('product.youAreViewing')}: <strong>{currentSlug}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="w-full">
          <ProductGallery product={product} galleryImages={galleryImages} mainImage={mainImage} />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="mb-[5px] font-[Georgia,serif] text-[1rem] md:text-[1.125rem] font-normal tracking-[.05em] leading-[1.333em]">
              {productName}
            </h1>
            <p className="text-[13px] text-gray-600">
              {typeof product.price === 'string' && !product.price.startsWith(PRODUCT_CONSTANTS.PRICE_SUFFIX)
                ? `${product.price} ${PRODUCT_CONSTANTS.PRICE_SUFFIX}`
                : product.price}
            </p>
          </div>

          <span className="w-full h-[1px] bg-gray-300"></span>

          {product.specs && product.specs.length > 0 && (
            <div>
              {product.specs
                .filter((spec) => spec.key === ProductSpecKey.COLOR)
                .map((spec) => {
                  const colors: string[] = []
                  spec.values?.forEach((value) => {
                    const splitColors = (value.value || '')
                      .split(',')
                      .map((c) => c.trim())
                      .filter(Boolean)
                    colors.push(...splitColors)
                  })

                  return (
                    <div key={spec.id}>
                      <div className="flex gap-1.5 bg-white/90 backdrop-blur-sm p-[2px] rounded-full shadow-inner w-fit">
                        <span className="text-[13px] flex items-center text-gray-600">{t('product.color')}:</span>
                        {colors.slice(0, PRODUCT_CONSTANTS.MAX_COLORS_DISPLAY).map((color, idx) => {
                          const colorKey = color.toLowerCase()
                          const bgColor = COLOR_MAP[colorKey] ?? colorKey ?? PRODUCT_CONSTANTS.DEFAULT_COLOR
                          return (
                            <span
                              key={`${spec.id}-color-${idx}`}
                              className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer"
                              style={{ backgroundColor: bgColor }}
                              title={color}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          <span className="w-full h-[1px] bg-gray-300"></span>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('product.selectASize')}</h3>
            <div className="grid grid-cols-3 gap-2">
              {(() => {
                const sizeSpec = product.specs?.find((spec) => spec.key === ProductSpecKey.SIZE)
                const sizeValues = sizeSpec?.values || product.sizes || []
                const sizes: string[] = []
                sizeValues.forEach((size) => {
                  const value = typeof size === 'string' ? size : size.value
                  sizes.push(...value.trim().split(/\s+/))
                })

                if (sizes.length > 0) {
                  return sizes.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSizeSelect(s)}
                      className={`h-12 px-4 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === s
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))
                }
                return <p className="col-span-3 text-sm text-gray-500">{t('product.noSizesAvailable')}</p>
              })()}
            </div>
          </div>

          <AddToCartButton
            id={String(product.id)}
            name={productName}
            price={
              typeof product.price === 'string'
                ? parseFloat(product.price.replace(/[^0-9.,]/g, ''))
                : product.price
            }
            size={selectedSize || undefined}
            color={product.specs?.[0]?.values?.[0]?.value}
            specs={product.specs}
            image={mainImage || product.img || product.imageUrl}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              !selectedSize ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedSize}
          >
            {selectedSize ? t('product.addToCart') : t('product.selectASize')}
          </AddToCartButton>

          <div className="pt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabItems.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-4">
              {activeTab === ProductTab.DESCRIPTION && (
                <div className="prose max-w-none">
                  {productDescription ? (
                    <p>{productDescription}</p>
                  ) : (
                    <p>{t('product.noDescriptionAvailable')}</p>
                  )}
                </div>
              )}
              {activeTab === ProductTab.SIZING && <p>{t('product.sizeGuide')}</p>}
              {activeTab === ProductTab.SHIPPING && <p>{t('product.shippingDetails')}</p>}
              {activeTab === ProductTab.RETURNS && <p>{t('product.returnPolicy')}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <RandomProduct />
      </div>
    </div>
  )
}
