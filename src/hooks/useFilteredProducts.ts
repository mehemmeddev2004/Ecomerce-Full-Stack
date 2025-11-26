import { useMemo } from "react";
import { applyCategoryFilter, applyColorFilter, applyPriceFilter, applySort } from "@/utils/productFilters";

export type UseFilteredParams = {
  products: any[];
  selectedCategories: Array<string | number>;
  selectedColor: string | null;
  selectedSort: string;
  minPrice: number | "";
  maxPrice: number | "";
};

export const useFilteredProducts = ({
  products,
  selectedCategories,
  selectedColor,
  selectedSort,
  minPrice,
  maxPrice,
}: UseFilteredParams) => {
  const filtered = useMemo(() => {
    const noFilters = !(
      selectedCategories?.length ||
      selectedColor ||
      selectedSort ||
      minPrice !== "" ||
      maxPrice !== ""
    );
    if (noFilters) return products;

    let local = [...products];
    local = applyCategoryFilter(local, selectedCategories);
    local = applyColorFilter(local, selectedColor);
    local = applyPriceFilter(local, minPrice, maxPrice);
    local = applySort(local, selectedSort);
    return local;
  }, [products, selectedCategories, selectedColor, selectedSort, minPrice, maxPrice]);

  return filtered;
};
