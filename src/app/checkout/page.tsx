"use client"

import DeliveryForm from "@/components/ui/checkout/DeliveryForm"
import CartSummary from "@/components/ui/checkout/CartSummary"
import { useTranslation } from "@/contexts/LocaleContext"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t("checkout.backToShopping")}</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Delivery Form */}
          <div className="order-2 lg:order-1">
            <DeliveryForm />
          </div>

          {/* Right Side - Cart Summary */}
          <div className="order-1 lg:order-2">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}