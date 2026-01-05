import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config.js";
import type {
  User,
  CreateUserData,
  UpdateUserData,
} from "../types/user.types.js";

const userCollection = collection(db, "users");

const getAll = async (): Promise<User[]> => {
  try {
    const snapshot = await getDocs(userCollection);
    const users: User[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        ...data,
      } as User);
    });

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
    throw new Error("Error al obtener usuarios");
  }
};

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      return null;
    }

    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
    throw new Error("Error al obtener usuario");
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
    throw new Error("Error al buscar usuario por email");
  }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const q = query(userCollection, where("username", "==", username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al buscar usuario por username: ${error.message}`);
    }
    throw new Error("Error al buscar usuario por username");
  }
};

const createUser = async (
  userData: CreateUserData
): Promise<{ id: string }> => {
  try {
    const newUser = {
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(userCollection, newUser);

    return { id: docRef.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
    throw new Error("Error al crear usuario");
  }
};

const updateUser = async (
  id: string,
  userData: UpdateUserData
): Promise<void> => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error(`Usuario con ID '${id}' no encontrado`);
    }

    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
    throw new Error("Error al actualizar usuario");
  }
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error(`Usuario con ID '${id}' no encontrado`);
    }

    await deleteDoc(userRef);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
    throw new Error("Error al eliminar usuario");
  }
};

const getUsersByRole = async (role: string): Promise<User[]> => {
  try {
    const q = query(userCollection, where("role", "==", role));
    const snapshot = await getDocs(q);
    const users: User[] = [];

    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener usuarios por rol: ${error.message}`);
    }
    throw new Error("Error al obtener usuarios por rol");
  }
};

export default {
  getAll,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole,
};
