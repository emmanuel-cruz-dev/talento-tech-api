import { doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db, productCollection } from "../config/firebase.config.js";

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

const getProductById = async (id) => {
  try {
    const product = doc(db, "productos", id);
    const productDoc = await getDoc(product);

    if (!productDoc.exists()) return null;

    return { id: productDoc.id, ...productDoc.data() };
  } catch (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
};

const createProduct = async (product) => {
  try {
    const newProduct = await addDoc(productCollection, product);

    return newProduct;
  } catch (error) {
    throw new Error("Error", error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = doc(db, "productos", id);
    const productDoc = await getDoc(product);

    if (!productDoc.exists()) {
      throw new Error(`No se encontró el producto con ID '${id}'`);
    }

    await deleteDoc(product);

    return { message: `Producto con ID '${id}' eliminado correctamente.` };
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};

export default { getAll, getProductById, createProduct, deleteProduct };
