import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload } from "../types/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token requerido",
      message: "Debes proporcionar un token de autenticación",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token expirado",
        message: "Tu sesión ha expirado. Por favor inicia sesión nuevamente",
      });
    }

    return res.status(403).json({
      error: "Token inválido",
      message: "El token proporcionado no es válido",
    });
  }
};

export default authenticateToken;
