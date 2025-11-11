import type { Product, ProductFilters } from "./product.types.js";

export interface PaginationOptions {
  limit: number;
  page: number;
  sortBy: string;
  order: string;
  filters: ProductFilters;
  startAfter?: string;
}

export interface PaginatedResult {
  products: Product[];
  total: number;
  hasNext: boolean;
  nextCursor?: string;
}
