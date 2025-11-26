import { Product } from '@/types/product';

export const mapSort = (val: string) => {
  switch (val) {
    case "Low to High": return "price_asc";
    case "High to Low": return "price_desc";
    case "A-Z": return "name_asc";
    case "Z-A": return "name_desc";
    case "Featured": return "featured";
    default: return val;
  }
};

export const applyCategoryFilter = (list: Product[], selectedCategories: Array<string|number>) => {
  if (!selectedCategories?.length) return list;
  const sel = selectedCategories.map(String);
  return list.filter((p: Product) => {
    const cid = p?.category?.id ?? p?.categoryId;
    return cid != null && sel.includes(String(cid));
  });
};

export const applyColorFilter = (list: Product[], selectedColor: string | null) => {
  if (!selectedColor) return list;
  const target = selectedColor.toLowerCase();
  return list.filter((p: Product) => {
    const specs = p?.specs || [];
    const specMatch = specs.some((s) =>
      (s?.key || s?.name || "").toLowerCase().includes("color") &&
      (s?.values || []).some((v) => (v?.value || v?.key)?.toLowerCase() === target)
    );
    if (specMatch) return true;
    return (p?.variants || []).some((vr) =>
      (vr?.specs || []).some((vs) =>
        String(vs?.key).toLowerCase() === "color" &&
        String(vs?.value).toLowerCase() === target
      )
    );
  });
};

export const applyPriceFilter = (list: Product[], minPrice: number | "", maxPrice: number | "") => {
  const minP = minPrice !== "" ? Number(minPrice) : null;
  const maxP = maxPrice !== "" ? Number(maxPrice) : null;
  return list.filter((p: Product) => {
    const price = Number(p?.price);
    if (minP != null && price < minP) return false;
    if (maxP != null && price > maxP) return false;
    return true;
  });
};

export const applySort = (list: Product[], selectedSort: string) => {
  const s = mapSort(selectedSort);
  const result = [...list];
  if (s === "price_asc") result.sort((a, b) => Number(a.price) - Number(b.price));
  if (s === "price_desc") result.sort((a, b) => Number(b.price) - Number(a.price));
  if (s === "name_asc") result.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  if (s === "name_desc") result.sort((a, b) => String(b.name).localeCompare(String(a.name)));
  return result;
};

export const applyAllFilters = (
  products: Product[],
  categories: Array<string|number>,
  color: string | null,
  minPrice: number | "",
  maxPrice: number | "",
  sort: string
) => {
  let result = [...products];
  result = applyCategoryFilter(result, categories);
  result = applyColorFilter(result, color);
  result = applyPriceFilter(result, minPrice, maxPrice);
  result = applySort(result, sort);
  return result;
};
