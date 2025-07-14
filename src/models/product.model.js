import { db } from "../config/firebase.config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const productCollection = collection(db, "productos");

const getAll = async () => {
  try {
    const productList = await getDocs(productCollection);
    const products = [];
    productList.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

    return products;
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

const getProductById = async (productId) => {
  return null;
};

const createProduct = async (product) => {
  try {
    const newProduct = await addDoc(productCollection, product);
    return newProduct;
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

const deleteProduct = async (productId) => {
  return null;
};

export default { getAll, getProductById, createProduct, deleteProduct };
