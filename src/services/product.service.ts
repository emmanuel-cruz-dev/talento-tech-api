import productModel from "../models/product.model.ts";
import { Product } from "../types/product.types.ts";

const getAll = async () => {
  return await productModel.getAll();
};

const getAllWithPagination = async (options) => {
  return await productModel.getAllWithPagination(options);
};

const getProductById = async (productId: number) => {
  return await productModel.getProductById(productId);
};

const createProduct = async (product: Product) => {
  return await productModel.createProduct(product);
};

const deleteProduct = async (productId: number) => {
  return await productModel.deleteProduct(productId);
};

const createManyProducts = async (products: Product[]) => {
  return await productModel.createManyProducts(products);
};

export default {
  getAll,
  getAllWithPagination,
  getProductById,
  createProduct,
  deleteProduct,
  createManyProducts,
};
