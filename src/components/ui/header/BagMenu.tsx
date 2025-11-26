"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useCart } from "@/providers/CartProvider"
import { useTranslation } from "@/contexts/LocaleContext"
import Link from "next/link"

interface BagMenuProps {
  onToggle: () => void
  isOpen: boolean
}

const colorMap: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#EF4444",
  blue: "#3B82F6",
  green: "#10B981",
  yellow: "#F59E0B",
  purple: "#A855F7",
  pink: "#EC4899",
  gray: "#6B7280",
  orange: "#F97316",
  brown: "#92400E",
  navy: "#1E3A8A",
  beige: "#D4C5B9",
}

const BagMenu: React.FC<BagMenuProps> = ({ onToggle, isOpen }) => {
  const { items, totalPrice: total, removeItem, clearCart, incrementQuantity, decrementQuantity } = useCart()
  const { t } = useTranslation()
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onToggle()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onToggle])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[50] flex">
      <div className="fixed inset-0 bg-black/40" onClick={onToggle} role="button" aria-label="Close cart overlay" />

      <div 
        ref={menuRef} 
        className={`fixed right-0 top-0 w-full md:w-[600px] h-full bg-white p-4 md:p-6 flex flex-col transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-4">
          <h3 className="font-serif text-sm md:text-base font-normal tracking-[0.05em] leading-[1.333]">
            {t("cart.yourCart")} ({items.length})
          </h3>
          <button onClick={onToggle} className="w-4 h-4" aria-label="Close cart">
            <svg className="w-full h-full text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
              <polygon
                points="34.56 2.56 32.44 .44 17.5 15.38 2.56 .44 .44 2.56 15.38 17.5 .44 32.44 2.56 34.56 17.5 19.62 32.44 34.56 34.56 32.44 19.62 17.5 34.56 2.56"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 animate-pulse">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400"
                >
                  <path
                    d="M75.5556 17.7778V80H4.44444V17.7778H75.5556ZM71.1111 21.9259H8.88889V75.8519H71.1111V21.9259ZM40 0C50.7506 0 59.7182 7.63407 61.7775 17.7769L57.218 17.7789C55.2448 10.1106 48.2841 4.44444 40 4.44444C31.7159 4.44444 24.7552 10.1106 22.782 17.7789L18.2225 17.7769C20.2818 7.63407 29.2494 0 40 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="text-sm md:text-base font-medium">{t("cart.emptyMessage")}</div>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex flex-col md:flex-row gap-3 md:gap-5">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full md:w-[160px] lg:w-[200px]  rounded-md"
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-bold uppercase text-xs md:text-[13px]">{item.name}</span>
                      <p className="text-gray-600 font-[600] text-xs md:text-[13px]">
                        {item.price.toLocaleString("az-AZ", { style: "currency", currency: "AZN" })}
                      </p>
                      <div className="w-full h-[1px] bg-gray-300 my-2" />
                      <p className="text-gray-600 text-xs md:text-[13px]">{t("cart.size")}: {item.size || "N/A"}</p>

                      {item.color && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs md:text-[13px]">
                          <span>{t("cart.color")}: {item.color}</span>
                        
                        </div>
                      )}

                    </div>

                    <div className="text-gray-600 text-xs md:text-[13px] flex items-center gap-2 md:gap-3 mt-2">
                      <span>{t("cart.quantity")}:</span>
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          className="px-1.5 md:px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50"
                          onClick={() => decrementQuantity(item.id, item.size)}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span className="min-w-[25px] md:min-w-[30px] text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <button
                          className="px-1.5 md:px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50"
                          onClick={() => incrementQuantity(item.id, item.size, item.stock)}
                          disabled={item.stock ? (item.quantity || 1) >= item.stock : false}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-gray-500 text-xs md:text-[13px] hover:opacity-70 md:self-start self-end"
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="w-full h-[1px] bg-gray-600 mb-2" />
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-y-[3px]">
              <span className="text-[9px] md:text-[10px] text-gray-600 font-[500] uppercase">{t("cart.total")}</span>
              <span className="text-[9px] md:text-[10px] text-gray-600 font-[500] uppercase">
                {t("cart.shippingTaxes")}
              </span>
            </div>
            <span className="text-xs md:text-[13px] font-bold text-gray-700">
              {total.toLocaleString("az-AZ", { style: "currency", currency: "AZN" })}
            </span>
          </div>
          <div className="w-full h-[1px] bg-gray-600 mb-4" />

          {items.length > 0 ? (
            <Link 
              href="/checkout" 
              onClick={onToggle}
              className="w-full h-[44px] md:h-[40px] bg-black text-white text-xs md:text-[12px] hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              {t("cart.checkout")}
            </Link>
          ) : (
            <button
              disabled
              className="w-full h-[44px] md:h-[40px] bg-gray-300 text-gray-500 text-xs md:text-[12px] cursor-not-allowed flex items-center justify-center"
            >
              {t("cart.checkout")}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BagMenu
