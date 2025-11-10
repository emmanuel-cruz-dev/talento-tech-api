import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter as firestoreStartAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db, productCollection } from "../config/firebase.config.js";
import { dbAdmin } from "../config/firebase.js";

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

const getAllWithPagination = async (options) => {
  const {
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    order = "desc",
    filters = {},
    startAfter = null,
  } = options;

  try {
    let q = productCollection;
    const constraints = [];

    if (filters.category) {
      constraints.push(where("category", "==", filters.category));
    }

    if (filters.brand) {
      constraints.push(where("brand", "==", filters.brand));
    }

    if (filters.isActive !== undefined) {
      constraints.push(where("isActive", "==", filters.isActive));
    }

    if (filters.minPrice !== undefined) {
      constraints.push(where("price", ">=", filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      constraints.push(where("price", "<=", filters.maxPrice));
    }

    if (filters.minRating !== undefined) {
      constraints.push(where("rating", ">=", filters.minRating));
    }

    if (filters.search) {
      const searchTerm = filters.search;
      constraints.push(where("name", ">=", searchTerm));
      constraints.push(where("name", "<=", searchTerm + "\uf8ff"));
    }

    constraints.push(orderBy(sortBy, order));

    if (startAfter) {
      const startDoc = await getDoc(doc(db, "productos", startAfter));
      if (startDoc.exists()) {
        constraints.push(firestoreStartAfter(startDoc));
      }
    }

    constraints.push(firestoreLimit(limit + 1));

    q = query(productCollection, ...constraints);
    const snapshot = await getDocs(q);

    let totalQuery = productCollection;
    const countConstraints = [];

    if (filters.category) {
      countConstraints.push(where("category", "==", filters.category));
    }
    if (filters.brand) {
      countConstraints.push(where("brand", "==", filters.brand));
    }
    if (filters.isActive !== undefined) {
      countConstraints.push(where("isActive", "==", filters.isActive));
    }
    if (filters.minPrice !== undefined) {
      countConstraints.push(where("price", ">=", filters.minPrice));
    }
    if (filters.maxPrice !== undefined) {
      countConstraints.push(where("price", "<=", filters.maxPrice));
    }
    if (filters.minRating !== undefined) {
      countConstraints.push(where("rating", ">=", filters.minRating));
    }

    if (countConstraints.length > 0) {
      totalQuery = query(productCollection, ...countConstraints);
    }

    const totalSnapshot = await getCountFromServer(totalQuery);
    const total = totalSnapshot.data().count;

    const products = [];
    const hasNext = snapshot.docs.length > limit;

    snapshot.docs.slice(0, limit).forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    let filteredProducts = products;
    if (
      filters.search &&
      !constraints.some(
        (c) => c.type === "where" && c.field.segments.includes("name")
      )
    ) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    const nextCursor =
      hasNext && filteredProducts.length > 0
        ? filteredProducts[filteredProducts.length - 1].id
        : null;

    return {
      products: filteredProducts,
      total,
      hasNext,
      nextCursor,
    };
  } catch (error) {
    console.error("Error en getAllWithPagination:", error);
    throw new Error(
      `Error al obtener productos con paginación: ${error.message}`
    );
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

const createManyProducts = async (products) => {
  const batch = dbAdmin.batch();
  const productsRef = dbAdmin.collection("productos");

  products.forEach((p) => {
    const ref = productsRef.doc();
    batch.set(ref, p);
  });

  await batch.commit();
  return { message: `${products.length} productos creados exitosamente` };
};

export default {
  getAll,
  getAllWithPagination,
  getProductById,
  createProduct,
  deleteProduct,
  createManyProducts,
};
