"use client"

import type { Product } from "@/types/product"
import { getProducts } from "@/utils/fetchProducts"
import { useTranslation } from "@/contexts/LocaleContext"
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"

const PRODUCT_LIMIT = 10

const RandomProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getProducts()
        if (!data || data.length === 0) {
          setError('Məhsul tapılmadı')
          return
        }
        const shuffled = data.sort(() => Math.random() - 0.5)
        setProducts(shuffled.slice(0, PRODUCT_LIMIT))
      } catch (error) {
        setError('Məhsullar yüklənərkən xəta baş verdi')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mt-10">
      <div className="pb-8 px-4 md:px-0">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-serif text-base md:text-lg font-normal tracking-wide">
            {t("categories.relatedProducts")}
          </h2>
          <Link
            href="/products"
            className="text-sm md:text-base text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            {t("categories.viewAll")}
          </Link>
        </div>
      </div>

      {error ? (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">{error}</p>
        </div>
      ) : (
        <>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
            {isLoading
              ? Array.from({ length: PRODUCT_LIMIT }).map((_, index) => (
                  <ProductCard key={`skeleton-${index}`} isLoading={true} />
                ))
              : products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
          </div>
      <div className="md:hidden -mx-4 px-4 overflow-hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 12 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
          }}
          grabCursor={true}
          className="!overflow-visible"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <ProductCard isLoading={true} />
                </SwiperSlide>
              ))
            : products.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
        </>
      )}
    </div>
  )
}

export default RandomProduct
