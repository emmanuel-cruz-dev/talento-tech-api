export interface Product {
  id: string;
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
}

export interface ProductWithPagination extends Product {
  nextCursor?: string;
}
