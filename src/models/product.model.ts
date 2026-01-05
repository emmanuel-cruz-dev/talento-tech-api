import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter as firestoreStartAfter,
  getCountFromServer,
  QueryConstraint,
} from "firebase/firestore";
import { db, productCollection } from "../config/firebase.config.js";
import { dbAdmin } from "../config/firebase.js";
import type {
  Product,
  PaginationOptions,
  PaginatedResult,
} from "../types/index.js";

const getAll = async (): Promise<Product[]> => {
  try {
    const productList = await getDocs(productCollection);
    const products: Product[] = [];
    productList.forEach((doc) =>
      products.push({ id: doc.id, ...doc.data() } as Product)
    );

    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(`Error al obtener productos: ${errorMessage}`);
    }
    throw new Error("Error al obtener productos");
  }
};

const getAllWithPagination = async (
  options: PaginationOptions
): Promise<PaginatedResult> => {
  const {
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    order = "desc",
    filters = {},
    startAfter = null,
  } = options;

  try {
    const constraints: QueryConstraint[] = [];

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

    constraints.push(orderBy(sortBy, order as "asc" | "desc"));

    if (startAfter) {
      const startDoc = await getDoc(doc(db, "productos", startAfter));
      if (startDoc.exists()) {
        constraints.push(firestoreStartAfter(startDoc));
      }
    }

    constraints.push(firestoreLimit(limit + 1));

    const q = query(productCollection, ...constraints);
    const snapshot = await getDocs(q);

    const countConstraints: QueryConstraint[] = [];

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

    const totalQuery =
      countConstraints.length > 0
        ? query(productCollection, ...countConstraints)
        : productCollection;

    const totalSnapshot = await getCountFromServer(totalQuery);
    const total = totalSnapshot.data().count;

    const products: Product[] = [];
    const hasNext = snapshot.docs.length > limit;

    snapshot.docs.slice(0, limit).forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product);
    });

    let filteredProducts = products;
    if (filters.search) {
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
        : undefined;

    return {
      products: filteredProducts,
      total,
      hasNext,
      nextCursor,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(
        `Error al obtener productos con paginación: ${errorMessage}`
      );
    }
    throw new Error(`Error al obtener productos con paginación`);
  }
};

const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = doc(db, "productos", id);
    const productDoc = await getDoc(product);

    if (!productDoc.exists()) return null;

    return { id: productDoc.id, ...productDoc.data() } as Product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(`Error al obtener el producto: ${errorMessage}`);
    }
    throw new Error(`Error al obtener el producto`);
  }
};

const createProduct = async (product: Product) => {
  try {
    const newProduct = await addDoc(productCollection, product);

    return newProduct;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(`Error al crear producto: ${errorMessage}`);
    }
    throw new Error("Error al crear producto");
  }
};

const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<{ id: string }> => {
  try {
    const product = doc(db, "productos", id);
    const productDoc = await getDoc(product);

    if (!productDoc.exists()) {
      throw new Error(`No se encontró el producto con ID '${id}'`);
    }

    await updateDoc(product, {
      ...productData,
      updatedAt: new Date().toISOString(),
    });

    return { id: productDoc.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(`Error al actualizar producto: ${errorMessage}`);
    }
    throw new Error("Error al actualizar producto");
  }
};

const deleteProduct = async (id: string) => {
  try {
    const product = doc(db, "productos", id);
    const productDoc = await getDoc(product);

    if (!productDoc.exists()) {
      throw new Error(`No se encontró el producto con ID '${id}'`);
    }

    await deleteDoc(product);

    return { message: `Producto con ID '${id}' eliminado correctamente.` };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new Error(`Error al eliminar el producto: ${errorMessage}`);
    }
    throw new Error(`Error al eliminar el producto`);
  }
};

const createManyProducts = async (products: Product[]) => {
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
  updateProduct,
  createProduct,
  deleteProduct,
  createManyProducts,
};
