import type { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { UserRole, type CreateUserData } from "../types/user.types.js";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, role, storeInfo, profile } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        error: "Campos requeridos faltantes",
        message: "Email, password y username son requeridos",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Email inválido",
        message: "Por favor proporciona un email válido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Contraseña débil",
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (role === UserRole.STORE && !storeInfo?.storeName) {
      return res.status(400).json({
        error: "Información de tienda requerida",
        message: "Las tiendas deben proporcionar un nombre de tienda",
      });
    }

    if (role === UserRole.ADMIN) {
      return res.status(400).json({
        error: "Acceso denegado",
        message: "No puedes registrar un administrador",
      });
    }

    const userData: CreateUserData = {
      email,
      password,
      username,
      role: role || UserRole.USER,
      profile: profile || {},
    };

    if (role === UserRole.STORE) {
      userData.storeInfo = {
        storeName: storeInfo.storeName,
        description: storeInfo.description || "",
        logo: storeInfo.logo || "",
        verified: false,
        totalSales: 0,
        rating: 0,
      };
    }

    const result = await authService.register(userData);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      payload: result,
    });
  } catch (error: any) {
    console.error("Error en registro:", error);
    res.status(400).json({
      error: "Error al registrar usuario",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Credenciales requeridas",
        message: "Email y password son requeridos",
      });
    }

    const result = await authService.login({ email, password });

    res.status(200).json({
      message: "Login exitoso",
      payload: result,
    });
  } catch (error: any) {
    console.error("Error en login:", error);
    res.status(401).json({
      error: "Error al iniciar sesión",
      message: error?.message || "Credenciales inválidas",
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "No autenticado",
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Campos requeridos",
        message: "currentPassword y newPassword son requeridos",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Contraseña débil",
        message: "La nueva contraseña debe tener al menos 6 caracteres",
      });
    }

    await authService.changePassword(req.user.id, currentPassword, newPassword);

    res.status(200).json({
      message: "Contraseña cambiada exitosamente",
    });
  } catch (error: any) {
    console.error("Error al cambiar contraseña:", error);
    res.status(400).json({
      error: "Error al cambiar contraseña",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: "No autenticado",
      });
    }

    const { id, email, username, role } = req.user;

    res.status(200).json({
      message: "Perfil obtenido",
      payload: {
        id,
        email,
        username,
        role,
      },
    });
  } catch (error: any) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({
      error: "Error al obtener perfil",
      message: error?.message || "Error interno del servidor",
    });
  }
};

export default {
  register,
  login,
  changePassword,
  getProfile,
};
