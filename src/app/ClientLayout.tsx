"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/providers/CartProvider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname() || ""
const isAdmin = pathname.startsWith("/admin")


  if (isAdmin) {
    return <main>{children}</main>
  }

  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  )
}
