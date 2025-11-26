// API request/response types

// Specs API types
export interface CreateSpecRequest {
  key: string;
  name: string;
  values: {
    key: string;
    value: string;
  }[];
}

export interface CreateSpecResponse {
  spec: {
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
  };
  message: string;
}

// Variants API types
export interface CreateVariantRequest {
  slug: string;
  price: number;
  stock: number;
  discount?: number;
  images?: string[];
  specs?: {
    key: string;
    value: string;
  }[];
}

export interface CreateVariantResponse {
  variant: {
    id: number;
    slug: string;
    price: number;
    stock: number;
    discount?: number;
    images?: string[];
    productId: number;
    specs?: {
      key: string;
      value: string;
    }[];
  };
  message: string;
}
