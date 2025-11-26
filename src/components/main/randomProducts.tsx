"use client";
import ProductCard from '@/components/ui/product/ProductCard';
import { Product } from '@/types/product';
import { getProducts } from '@/utils/fetchProducts';
import { useTranslation } from '@/contexts/LocaleContext';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

const RandomProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const getFetchedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        setProducts(response.slice(0, 5));
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setIsLoading(false);
      }
    };
    getFetchedProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderProducts = () => {
    return (
      <div className="w-full max-w-[1430px] mx-auto px-4 py-8">
        <div className="pb-[32px]">
          <div className="flex justify-between items-center">
            <span className="text-[20px] font-[600] leading-[30px] tracking-[0.157143rem] uppercase font-[Proxima Nova,'Helvetica Neue',Verdana,Arial,sans-serif]">{t("categories.randomProducts")}</span>
            <Link href="/products" className="text-[1rem] font-[400] decoration-black decoration-2 leading-[22px] tracking-[0.02rem] text-[#999999] hover:text-black transition-colors no-underline block ml-[20px] font-[Proxima Nova,'Helvetica Neue',Verdana,Arial,sans-serif]">{t("categories.viewAll")}</Link>
          </div>
        </div>
        <div>
        {isMobile ? (
          <div className="overflow-hidden -mx-4 px-4">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1, spaceBetween: 16 },
              }}
              grabCursor={true}
              className="!overflow-visible"
            >
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                      <ProductCard isLoading={true} />
                    </SwiperSlide>
                  ))
                : products.map((item) => (
                    <SwiperSlide key={item.id}>
                      <ProductCard item={item} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <ProductCard key={`skeleton-${index}`} isLoading={true} />
                ))
              : products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
          </div>
        )}
        </div>
      </div>
    );
  };

  return renderProducts();
};

export default RandomProducts;
