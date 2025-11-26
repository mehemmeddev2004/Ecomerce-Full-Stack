"use client"

import Link from "next/link"
import type { Product } from "@/types/product"
import ProductCardSkeleton from "./ProductCardSkeleton"
import { useTranslation } from "@/hooks/useTranslation"
import { getTranslated } from "@/utils/translateProduct"

const LATEST_DAYS = 7

function isLatest(dateString?: string) {
  if (!dateString) return false
  const diffDays =
    (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= LATEST_DAYS
}

const NewBadge = ({ label }: { label: string }) => (
  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
    {label}
  </div>
)

const colorMap: Record<string, string> = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  black: "#000000",
  white: "#FFFFFF",
  yellow: "#FFFF00",
}

const ProductCard = ({
  item,
  isLoading = false,
}: {
  item?: Product
  isLoading?: boolean
}) => {
  const { t, locale } = useTranslation();
  
  if (isLoading || !item) return <ProductCardSkeleton />

  const isNewProduct = item.isNew || isLatest(item.createdAt || item.date)
  const imageUrl = item.imageUrl || item.images || item.img || ""
  const productName = getTranslated(item.name, locale)

  // --- 🧮 Endirim məntiqi ---
  const primaryVariant = item.variants?.[0]
  const priceNumber = Number(primaryVariant?.price ?? item.price)
  const discountNumber = Number(item.discount ?? 0)
  const variantDiscountNumber = Number(primaryVariant?.discount ?? 0)
  const effectiveDiscount = discountNumber > 0 ? discountNumber : variantDiscountNumber
  const hasDiscount = effectiveDiscount > 0
  const discountedPrice = hasDiscount
    ? (priceNumber * (100 - effectiveDiscount)) / 100
    : priceNumber

  return (
    <Link
      href={`/product/${item.id}`}
      className="group block overflow-hidden bg-white relative "
    >
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={productName}
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-xl"
        />
        {isNewProduct && <NewBadge label={t('product.new')} />}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
            -{effectiveDiscount}%
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#333] group-hover:text-black transition-colors">
            {productName}
          </h2>

          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  {priceNumber} AZN
                </span>
                <span className="text-red-500 font-semibold">
                  {Number(discountedPrice).toFixed(2)} AZN
                </span>
              </>
            ) : (
              <span className="text-gray-700 font-semibold">{priceNumber} AZN</span>
            )}
          </div>
        </div>

        {item.specs && Array.isArray(item.specs) && (
          <div className="flex gap-1.5">
            {item.specs.map((spec, specIndex) =>
              spec?.values && Array.isArray(spec.values)
                ? spec.values.slice(0, 4).map((v, valIndex) => {
                    const colorKey = v.value?.toLowerCase() ?? ""
                    const bgColor =
                      colorMap[colorKey] ?? v.value?.toLowerCase() ?? "#f3f4f6"

                    return (
                      <span
                        key={v?.id ?? `${specIndex}-${valIndex}`}
                        className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer"
                        style={{ backgroundColor: bgColor }}
                        title={v?.value || "Color option"}
                      />
                    )
                  })
                : null
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard