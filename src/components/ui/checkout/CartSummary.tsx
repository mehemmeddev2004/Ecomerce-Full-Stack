"use client"

import { useCart } from "@/providers/CartProvider"
import { useTranslation } from "@/contexts/LocaleContext"
import Image from "next/image"
import { Trash2 } from "lucide-react"

export default function CartSummary() {
  const { items, removeItem, totalPrice, totalItems } = useCart()
  const { t } = useTranslation()

  if (items.length === 0) {
    return (
      <div className="bg-neutral-50 rounded-lg p-8 h-fit sticky top-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">{t("checkout.orderSummary")}</h2>
        <div className="text-center py-12">
          <p className="text-neutral-500">{t("checkout.emptyCart")}</p>
        </div>
      </div>
    )
  }

  const shippingCost = 0 // Free shipping
  const tax = totalPrice * 0.18 // 18% tax
  const finalTotal = totalPrice + shippingCost + tax

  return (
    <div className=" rounded-lg p-8 h-fit sticky top-8">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">{t("checkout.orderSummary")}</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white rounded-lg p-4">
            {/* Product Image */}
            <div className="relative w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <span className="text-xs">{t("checkout.noImage")}</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900 truncate">{item.name}</h3>
              <div className="flex gap-2 mt-1 text-sm text-neutral-600">
                {item.size && <span>Size: {item.size}</span>}
                {item.color && <span>• {item.color}</span>}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-neutral-600">{t("checkout.qty")}: {item.quantity || 1}</span>
                <span className="font-semibold text-neutral-900">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id, item.size)}
              className="text-neutral-400 hover:text-red-500 transition-colors p-2 h-fit"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 my-6" />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-neutral-700">
          <span>{t("checkout.subtotal")} ({totalItems} {t("checkout.items")})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-700">
          <span>{t("checkout.shipping")}</span>
          <span className="text-green-600 font-medium">{t("checkout.freeShipping")}</span>
        </div>
        <div className="flex justify-between text-neutral-700">
          <span>{t("checkout.tax")} (18%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 my-6" />

      {/* Total */}
      <div className="flex justify-between text-xl font-semibold text-neutral-900 mb-2">
        <span>{t("common.total")}</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      {/* Info Text */}
      <p className="text-xs text-neutral-500 mt-4">
        {t("checkout.termsAgreement")}
      </p>
    </div>
  )
}