export interface VariantSpec {
  key: string;
  value: string;
}

export interface Variant {
  slug: string;
  price: number;
  stock: number;
  discount?: number;
  images?: string[];
  specs: VariantSpec[];
}
