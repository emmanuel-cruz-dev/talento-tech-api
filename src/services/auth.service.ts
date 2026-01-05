import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import type {
  CreateUserData,
  LoginCredentials,
  AuthResponse,
  JWTPayload,
} from "../types/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const SALT_ROUNDS = 10;

const register = async (userData: CreateUserData): Promise<AuthResponse> => {
  try {
    const existingEmail = await userModel.getUserByEmail(userData.email);
    if (existingEmail) {
      throw new Error("El email ya está registrado");
    }

    const existingUsername = await userModel.getUserByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new Error("El username ya está en uso");
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const newUserData: CreateUserData = {
      ...userData,
      password: hashedPassword,
    };

    const { id } = await userModel.createUser(newUserData);

    const token = generateToken({
      id,
      email: userData.email,
      username: userData.username,
      role: userData.role,
    });

    return {
      token,
      user: {
        id,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en registro: ${error.message}`);
    }
    throw new Error("Error en registro");
  }
};

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const { email, password } = credentials;

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    if (!user.isActive) {
      throw new Error("Usuario inactivo. Contacta al administrador");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    const token = generateToken({
      id: user.id!,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id!,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error en login");
  }
};

const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const user = await userModel.getUserById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Contraseña actual incorrecta");
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await userModel.updateUser(userId, { password: hashedPassword } as any);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al cambiar contraseña");
  }
};

export default {
  register,
  login,
  verifyToken,
  changePassword,
  generateToken,
};
