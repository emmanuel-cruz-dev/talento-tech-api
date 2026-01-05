import type { Request, Response } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { UserRole, type UpdateUserData } from "../types/user.types.js";

const SALT_ROUNDS = 10;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getAll();

    const sanitizedUsers = users.map(({ password, ...user }) => user);

    res.status(200).json({
      message: "Lista de usuarios",
      payload: sanitizedUsers,
      total: sanitizedUsers.length,
    });
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      error: "Error al obtener usuarios",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID requerido",
        message: "Debes proporcionar un ID de usuario",
      });
    }

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
        message: `No se encontró usuario con ID '${id}'`,
      });
    }

    const { password, ...sanitizedUser } = user;

    res.status(200).json({
      message: "Usuario obtenido",
      payload: sanitizedUser,
    });
  } catch (error: any) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({
      error: "Error al obtener usuario",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;

    if (!Object.values(UserRole).includes(role as UserRole)) {
      return res.status(400).json({
        error: "Rol inválido",
        message: `El rol debe ser: ${Object.values(UserRole).join(", ")}`,
      });
    }

    const users = await userModel.getUsersByRole(role);

    const sanitizedUsers = users.map(({ password, ...user }) => user);

    res.status(200).json({
      message: `Usuarios con rol ${role}`,
      payload: sanitizedUsers,
      total: sanitizedUsers.length,
    });
  } catch (error: any) {
    console.error("Error al obtener usuarios por rol:", error);
    res.status(500).json({
      error: "Error al obtener usuarios",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateUserData = req.body;

    if (!id) {
      return res.status(400).json({
        error: "ID requerido",
      });
    }

    if (req.user?.role !== UserRole.ADMIN && updateData.role) {
      return res.status(403).json({
        error: "Acción no permitida",
        message: "No puedes cambiar tu propio rol",
      });
    }

    if (updateData.password) {
      (updateData as any).password = await bcrypt.hash(
        updateData.password as any,
        SALT_ROUNDS
      );
    }

    await userModel.updateUser(id, updateData);

    res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({
      error: "Error al actualizar usuario",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID requerido",
      });
    }

    if (req.user?.id === id) {
      return res.status(400).json({
        error: "Acción no permitida",
        message: "No puedes eliminar tu propia cuenta",
      });
    }

    await userModel.deleteUser(id);

    res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error: any) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({
      error: "Error al eliminar usuario",
      message: error?.message || "Error interno del servidor",
    });
  }
};

const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID requerido",
      });
    }

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    if (req.user?.id === id) {
      return res.status(400).json({
        error: "Acción no permitida",
        message: "No puedes desactivar tu propia cuenta",
      });
    }

    await userModel.updateUser(id, { isActive: !user.isActive });

    res.status(200).json({
      message: `Usuario ${
        user.isActive ? "desactivado" : "activado"
      } exitosamente`,
      payload: {
        id,
        isActive: !user.isActive,
      },
    });
  } catch (error: any) {
    console.error("Error al cambiar estado del usuario:", error);
    res.status(500).json({
      error: "Error al cambiar estado",
      message: error?.message || "Error interno del servidor",
    });
  }
};

export default {
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  deleteUser,
  toggleUserStatus,
};
