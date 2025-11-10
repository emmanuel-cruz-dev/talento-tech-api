import type { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";

export const validateProductQuery = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit debe ser un número entre 1 y 100")
    .toInt(),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page debe ser un número mayor o igual a 1")
    .toInt(),

  query("sortBy")
    .optional()
    .isIn([
      "name",
      "price",
      "createdAt",
      "category",
      "rating",
      "stock",
      "brand",
    ])
    .withMessage(
      "sortBy debe ser uno de: name, price, createdAt, category, rating, stock, brand"
    ),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("order debe ser asc o desc"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("minPrice debe ser un número mayor o igual a 0")
    .toFloat(),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("maxPrice debe ser un número mayor o igual a 0")
    .toFloat(),

  query("minRating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("minRating debe ser un número entre 0 y 5")
    .toFloat(),

  query("search")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("search debe ser un texto de 1 a 100 caracteres"),

  query("category")
    .optional()
    .isString()
    .trim()
    .withMessage("category debe ser un texto válido"),

  query("brand")
    .optional()
    .isString()
    .trim()
    .withMessage("brand debe ser un texto válido"),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive debe ser true o false")
    .toBoolean(),

  query("startAfter")
    .optional()
    .isString()
    .withMessage("startAfter debe ser un ID de documento válido"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Error de validación en los parámetros",
        payload: {
          errors: errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
            value: err.value,
          })),
        },
      });
    }

    next();
  },
];

export const validatePriceRange = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { minPrice, maxPrice } = req.query;

  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    return res.status(400).json({
      message: "Error de validación",
      payload: {
        error: "minPrice no puede ser mayor que maxPrice",
      },
    });
  }

  next();
};

export default {
  validateProductQuery,
  validatePriceRange,
};
