"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/utils/fetchProducts"
import ProductCard from "../ui/product/ProductCard"

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading
        ? Array(8)
            .fill(null)
            .map((_, i) => <ProductCard key={i} isLoading />)
        : products.map((item) => <ProductCard key={item.id} item={item} />)}
    </div>
  )
}

export default ProductList
      