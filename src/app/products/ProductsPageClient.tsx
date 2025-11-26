"use client";
import { useState, useEffect, useMemo } from "react";
import ProductFilter from "@/components/ui/product/ProductFilter";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ui/product/ProductCard";
import { applyCategoryFilter, applyColorFilter, applyPriceFilter, applySort } from "@/utils/productFilters";
import type { Product } from "@/types/product";
import { useTranslation } from "@/hooks/useTranslation";


interface ProductsPageClientProps {
  categorySlug?: string;
}

const ProductsPageClient = ({ categorySlug }: ProductsPageClientProps) => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedCategories, setSelectedCategories] = useState<Array<string | number>>([]);
  const [checked, setChecked] = useState<boolean[]>([]);

  // Set category from URL slug only once when products load
  useEffect(() => {
    if (products.length > 0 && categorySlug && selectedCategories.length === 0) {
      const category = products.find(p => p.category?.slug === categorySlug)?.category;
      if (category) {
        setSelectedCategories([category.id]);
      }
    }
  }, [products, categorySlug]);

  // Use useMemo to compute filtered products without causing re-renders
  const filteredProducts = useMemo(() => {
    const noFilters =
      !selectedCategories.length &&
      !selectedColor &&
      !selectedSort &&
      minPrice === "" &&
      maxPrice === "";
    
    if (noFilters) {
      return products;
    }
    
    let local = [...products];
    local = applyCategoryFilter(local, selectedCategories);
    local = applyColorFilter(local, selectedColor);
    local = applyPriceFilter(local, minPrice, maxPrice);
    local = applySort(local, selectedSort);
    return local;
  }, [products, selectedCategories, selectedColor, selectedSort, minPrice, maxPrice]);


  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleFilters = () => setFiltersOpen((prev) => !prev);


  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedColor(null);
    setSelectedSort("");
    setMinPrice("");
    setMaxPrice("");
    setChecked([]);
  };


  return (
    <div className="max-w-[1430px] mx-auto px-4 py-4 min-h-screen flex flex-col relative">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-[15px] text-gray-600">
          {t('product.productsCount', { count: filteredProducts.length })}
        </span>
        <button onClick={toggleFilters} className="p-2">
          <img src="/img/filter.svg" alt="Toggle filters" />
        </button>
      </div>


      {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('product.productsLoading')}</p>
          </div>
        </div>
      ) : filteredProducts.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3  w-full">
          {filteredProducts.map((product, idx) => (
            product && typeof product === "object" ? (
              (product.id || product._id) ? (
                <ProductCard key={product.id ?? product._id} item={product} />
              ) : (
                <ProductCard key={idx} item={product} />
              )
            ) : null
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-600">
          <p className="mb-4">{t('product.noResults')}</p>
          <button
            className="px-4 py-2 border rounded"
            onClick={resetFilters}
          >
            {t('product.resetFilters')}
          </button>
        </div>
      )}


      <ProductFilter
        handleFilterChange={filtersOpen}
        handleFilterToggle={toggleFilters}
        openSections={openSections}
        toggleSection={toggleSection}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMin={setMinPrice}
        onChangeMax={setMaxPrice}
        onApplyPrice={() => {}}
        onChangeSelectedCategories={setSelectedCategories}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};


export default ProductsPageClient;
