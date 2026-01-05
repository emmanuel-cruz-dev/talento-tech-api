import productModel from "../models/product.model.js";
import type {
  Product,
  PaginationOptions,
  PaginatedResult,
  CreateProductData,
} from "../types/index.js";

const getAll = async (): Promise<Product[]> => {
  return await productModel.getAll();
};

const getAllWithPagination = async (
  options: PaginationOptions
): Promise<PaginatedResult> => {
  return await productModel.getAllWithPagination(options);
};

const getProductById = async (productId: string): Promise<Product | null> => {
  return await productModel.getProductById(productId);
};

const createProduct = async (
  product: CreateProductData
): Promise<{ id: string }> => {
  return await productModel.createProduct(product);
};

const updateProduct = async (
  productId: string,
  productData: Partial<Product>
): Promise<{ id: string }> => {
  return await productModel.updateProduct(productId, productData);
};

const deleteProduct = async (
  productId: string
): Promise<{ message: string }> => {
  return await productModel.deleteProduct(productId);
};

const createManyProducts = async (
  products: CreateProductData[]
): Promise<{ message: string }> => {
  return await productModel.createManyProducts(products);
};

export default {
  getAll,
  getAllWithPagination,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  createManyProducts,
};
