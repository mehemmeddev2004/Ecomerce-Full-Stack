// Çoxdilli məlumat üçün type
export type TranslatedField = {
  az?: string;
  en?: string;
  ru?: string;
};

export type Product = {
  sizes: string[] | { id: string; name: string; value: string }[];
  colors: string[] | { id: string; name: string; value: string }[];
  id: string;
  _id?: string; // Optional MongoDB-style ID
  slug: string;
  name: string | TranslatedField;  // Çoxdilli dəstək
  description?: string | TranslatedField;  // Çoxdilli dəstək
  img?: string; // əsas şəkil
  images?: string;
  brand: string; // <-- only string, required
  imageUrl?: string;
  price: number | string; // API-də string gəlir, lazım gələrsə number-a çevir
  stock: number;
  discount?: number;
  isActive?: boolean;
  isNew?: boolean;
  date?: string;
  categoryId?: number;

  category?: {
    id: number;
    name: string | TranslatedField;
    slug: string;
    parentId?: number | null;
    imageUrl?: string | null;
  };

  specs?: {
    id: number;
    key: string;
    name: string;
    productId: number;
    values: {
      id: number;
      key: string;
      value: string;
      productSpecId: number;
    }[];
  }[];

  variants?: {
    id: number;
    slug: string;
    price: number | string;
    stock: number;
    discount?: number;
    images?: string[];
    productId: number;
    specs?: {
      key: string;
      value: string;
    }[];
  }[];

  createdAt?: string;
  updatedAt?: string;
};


// Filterlərin tipi
export type SelectedFilters = {
  brand: string[];
  color: string[];
  size: string[];
};
