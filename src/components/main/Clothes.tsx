"use client"

import type { Product } from "@/types/product"
import { useProducts } from "@/hooks/useProducts"
import { useTranslation } from "@/contexts/LocaleContext"
import Image from "next/image"
import ProductCard from "../ui/product/ProductCard"


const Clothes = () => {
  const { data: products = [], isLoading: loading } = useProducts()
  const { t } = useTranslation()

  const isCategory13 = (item: Product) => Number(item.categoryId ?? item.category?.id) === 13

  return (
    <section className="w-full  py-12 lg:py-16">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
       

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
         <div className="">
           <div className="flex flex-col mb-[50px] gap-[10px] justify-between">
            <span className="flex items-center gap-3 "><div className="w-[7px] h-2 bg-black"></div><span className="text-[20px] font-[600] leading-[30px] tracking-[0.157143rem] uppercase font-[Proxima Nova,'Helvetica Neue',Verdana,Arial,sans-serif]">{t("categories.clothing")} {t("categories.collection")}</span></span>

           <span className="text-[1rem] font-[400] leading-[22px] tracking-[0.02rem] text-[#999999] no-underline block ml-[20px] font-[Proxima Nova,'Helvetica Neue',Verdana,Arial,sans-serif]">{t("footer.collections")}</span>
          </div>
          <div className="w-full lg:w-[676px] h-[676px] relative group">
              <Image
                src="/img/clothes.jpg"
                width={700}
                height={850}
                alt="Clothes collection"
                className="w-full h-[676px] sm:h-[500px] lg:h-[676px] object-cover "
              />
          </div>
         </div>

          <div className="w-full lg:w-1/2">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[400px] bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                {products.filter(isCategory13).map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {!loading && products.filter(isCategory13).length === 0 && (
              <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Məhsul tapılmadı</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clothes