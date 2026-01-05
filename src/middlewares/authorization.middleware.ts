import type { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/user.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role: UserRole;
      };
    }
  }
}

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: "No autenticado",
        message: "Debes estar autenticado para acceder a este recurso",
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: "Acceso denegado",
        message: `Necesitas rol ${allowedRoles.join(
          " o "
        )} para acceder a este recurso`,
        yourRole: userRole,
      });
    }

    next();
  };
};

export const requireAdmin = requireRole(UserRole.ADMIN);

export const requireStoreOrAdmin = requireRole(UserRole.STORE, UserRole.ADMIN);

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      error: "No autenticado",
      message: "Debes estar autenticado para acceder a este recurso",
    });
  }
  next();
};

export const requireOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      error: "No autenticado",
    });
  }

  const requestedUserId = req.params.id || req.params.userId;
  const currentUserId = req.user.id;
  const isAdmin = req.user.role === UserRole.ADMIN;

  if (requestedUserId !== currentUserId && !isAdmin) {
    return res.status(403).json({
      error: "Acceso denegado",
      message: "Solo puedes acceder a tus propios recursos",
    });
  }

  next();
};

export default {
  requireRole,
  requireAdmin,
  requireStoreOrAdmin,
  requireAuth,
  requireOwnerOrAdmin,
};
