'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from "@/utils/fetchProducts";
import ProductContent from "./ProductContent";
import { Product } from "@/types/product";

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setError('Product ID is missing');
        return;
      }
      
      setLoading(true)
      setError(null)
      try {
        const productData = await getProductById(Number(productId))
        
        if (!productData) {
          throw new Error('Product not found')
        }

        setProduct(productData)
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="relative w-14 h-14 mx-auto">
          {/* Arxa dairə */}
          <div className="absolute inset-0 border-[1.5px] border-gray-300 rounded-full opacity-30" />
          {/* Dönen dairə */}
          <div className="absolute inset-0 border-[1.5px] border-gray-800 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Product not found'}</p>
      </div>
    );
  }

  // Fix protocol-relative URLs (starting with //)
  const fixImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('//')) return `https:${url}`;
    return url;
  };

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map((url: string, idx: number) => ({
        id: String(idx + 1),
        url: fixImageUrl(url),
      }))
    : [];

  const mainImage = fixImageUrl(product.img || '') || galleryImages[0]?.url || '';

  return (
    <ProductContent
      product={product}
      galleryImages={galleryImages}
      mainImage={mainImage}
    />
  );
}
