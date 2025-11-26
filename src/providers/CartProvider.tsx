"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 🛍️ Cart Item tipi
interface CartItem {
  id: string
  name: string
  price: number
  quantity?: number
  image?: string
  size?: string
  color?: string
  stock?: number
  specs?: {
    id: number
    key: string
    name: string
    productId: number
    values: {
      id: number
      key: string
      value: string
      productSpecId: number
    }[]
  }[]
}

// 🧩 Cart Context tipi
interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string) => void
  clearCart: () => void
  updateQuantity: (id: string, size: string | undefined, newQuantity: number) => void
  incrementQuantity: (id: string, size: string | undefined, maxStock?: number) => void
  decrementQuantity: (id: string, size: string | undefined) => void
  totalItems: number
  totalPrice: number
}

// 🔗 Context yaradılır
const CartContext = createContext<CartContextType | undefined>(undefined)

// 🔑 User-specific cart key generator
const getCartKey = () => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  if (!user || user === "null" || user === "undefined") return null
  
  try {
    const userData = JSON.parse(user)
    const userId = userData.id || userData._id || userData.email
    return userId ? `cart_${userId}` : null
  } catch {
    return null
  }
}

// 🌐 Provider komponenti
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // 📥 Load cart from localStorage on mount
  useEffect(() => {
    const cartKey = getCartKey()
    if (cartKey) {
      try {
        const savedCart = localStorage.getItem(cartKey)
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setItems(parsedCart)
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // 💾 Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isInitialized) return
    
    const cartKey = getCartKey()
    if (cartKey) {
      try {
        localStorage.setItem(cartKey, JSON.stringify(items))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [items, isInitialized])

  // 👤 Listen for user changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const cartKey = getCartKey()
      if (cartKey) {
        try {
          const savedCart = localStorage.getItem(cartKey)
          if (savedCart) {
            setItems(JSON.parse(savedCart))
          } else {
            setItems([])
          }
        } catch (error) {
          console.error("Error loading cart after user change:", error)
          setItems([])
        }
      } else {
        setItems([])
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // ➕ Məhsul əlavə et
  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.size === item.size
      )

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  // ❌ Məhsul sil
  const removeItem = (id: string, size?: string) => {
    setItems((prev) =>
      prev.filter((item) =>
        size ? !(item.id === id && item.size === size) : item.id !== id
      )
    )
  }

  // 🧹 Səbəti təmizlə
  const clearCart = () => {
    setItems([])
    const cartKey = getCartKey()
    if (cartKey) {
      localStorage.removeItem(cartKey)
    }
  }

  // 🔄 Miqdarı yenilə
  const updateQuantity = (id: string, size: string | undefined, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id, size)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // ➕ Miqdarı artır
  const incrementQuantity = (id: string, size: string | undefined, maxStock?: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          const currentQuantity = item.quantity || 1
          const newQuantity = currentQuantity + 1
          
          // Stock limiti varsa yoxla
          if (maxStock && newQuantity > maxStock) {
            return item // Stock limitini keçməsin
          }
          
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  // ➖ Miqdarı azalt
  const decrementQuantity = (id: string, size: string | undefined) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          const currentQuantity = item.quantity || 1
          const newQuantity = currentQuantity - 1
          
          if (newQuantity <= 0) {
            return item // 0-a düşməsin, removeItem istifadə et
          }
          
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  // 📊 Ümumi dəyərlər
  const totalItems = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  )

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  // 💬 Context qaytarılır
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 🧠 Hook – Cart context-dən istifadə üçün
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
