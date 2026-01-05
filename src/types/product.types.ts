export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  brand: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  ownerId?: string;
  ownerName?: string;
}

export interface ProductWithPagination extends Product {
  nextCursor?: string;
}

export interface ProductQueryParams {
  limit?: string;
  page?: string;
  sortBy?: string;
  order?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  isActive?: string;
  minRating?: string;
  startAfter?: string;
  ownerId?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  isActive?: boolean;
  ownerId?: string;
}

export type CreateProductData = Omit<Product, "id" | "createdAt"> & {
  createdAt: string;
  ownerId?: string;
};
