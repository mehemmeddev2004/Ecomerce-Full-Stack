"use client"
import { Product } from "@/types/product"
import { getProducts } from "@/utils/fetchProducts"
import type React from "react"
import { useEffect, useState } from "react"
import ProductCard from "../product/ProductCard"

interface FilterProps {
  isOpen: boolean
  onClose: () => void
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const productList = await getProducts()
      setProducts(productList)
    }
    fetchData()
  }, [])

  const filteredProducts = products.filter(product => {
    try {
      if (!product) return false;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true; // Show all products if search is empty
      
      const name = String(product.name || '').toLowerCase();
      const description = typeof product.description === 'string' 
        ? product.description.toLowerCase() 
        : '';
      
      return name.includes(query) || description.includes(query);
    } catch (error) {
      console.error('Error filtering products:', error);
      return false; // Skip products that cause errors
    }
  });

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50  bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="w-6"></div> {/* For alignment */}
        <h2 className="font-bold text-[30px]">ETOR</h2>
        <button 
          onClick={onClose}
          className=" hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 35"
          >
            <polygon points="34.56 2.56 32.44 .44 17.5 15.38 2.56 .44 .44 2.56 15.38 17.5 .44 32.44 2.56 34.56 17.5 19.62 32.44 34.56 34.56 32.44 19.62 17.5 34.56 2.56"></polygon>
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="w-full border-b border-gray-200 p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-black outline-none"
          placeholder="Search products..."
        />
      </div>

      {/* Product List */}
      <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filter