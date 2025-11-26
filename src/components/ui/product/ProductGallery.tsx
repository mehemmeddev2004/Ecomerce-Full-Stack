"use client"

import { useState, useEffect } from 'react'
import type { Product } from "@/types/product"

interface GalleryImage {
  id: string
  url: string
}

interface ProductGalleryProps {
  product: Product
  galleryImages: GalleryImage[]
  mainImage: string
}

const ProductGallery = ({ product, galleryImages, mainImage }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage)
  const [imageError, setImageError] = useState<boolean>(false)

  useEffect(() => {
    try {
      if (mainImage) {
        setSelectedImage(mainImage)
        setImageError(false)
      }
    } catch {
      setImageError(true)
    }
  }, [mainImage])

  return (
    <div className="product-gallery space-y-4">
      <div className="w-full h-auto bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {imageError ? (
          <div className="flex flex-col items-center justify-center p-8">
            <span className="text-gray-500">Şəkil yüklənmədi</span>
          </div>
        ) : selectedImage ? (
          <img 
            src={selectedImage} 
            alt={product.name?.toString() || 'Product image'}
            className="w-full h-full object-cover"
            width={800}
            height={600}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-gray-500">Şəkil mövcud deyil</span>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img.url)}
              className={`h-20 rounded-md overflow-hidden transition-all ${
                selectedImage === img.url ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${img.id}`}
            >
              <img 
                src={img.url} 
                alt={`Thumbnail ${img.id}`}
                className="w-full h-full "
                width={100}
                height={80}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
