import productModel from "../models/product.model";

const getAll = async () => {
  return await productModel.getAll();
};

const getProductById = async (productId) => {
  return await productModel.getProductById(productId);
};

const createProduct = async (product) => {
  return await productModel.createProduct(product);
};

const deleteProduct = async (productId) => {
  return await productModel.deleteProduct(productId);
};

export default { getAll, getProductById, createProduct, deleteProduct };
