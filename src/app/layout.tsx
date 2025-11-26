"use client"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import dynamic from 'next/dynamic'
import { CartProvider } from '@/providers/CartProvider'
import QueryProvider from '@/providers/QueryProvider'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ToastContainer } from 'react-toastify'
import { usePathname } from "next/navigation"
import { inter } from './fonts'

const Header = dynamic(() => import('@/components/Header'), { 
  ssr: true,
  loading: () => <div style={{ height: '80px' }} />
})
const Footer = dynamic(() => import('@/components/Footer'), { 
  ssr: true,
  loading: () => <div style={{ height: '200px' }} />
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  
  return (
    <html lang="az" className={inter.variable}>
      <head>
        <title>ETOR - Premium Tailoring</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Создаём исключительные костюмы с итальянской точностью и мастерством" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://kith.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://kith.com" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <LocaleProvider>
          <QueryProvider>
            <CartProvider>
              {!isAdminRoute && <Header />}
              {children}
              {!isAdminRoute && <Footer />}

              <ToastContainer />
            </CartProvider>
          </QueryProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
