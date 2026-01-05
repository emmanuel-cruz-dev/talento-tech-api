import { Router } from "express";
import productController from "../controllers/product.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import {
  validateProductQuery,
  validatePriceRange,
} from "../middlewares/validateQuery.middleware.js";
import { requireStoreOrAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get(
  "/",
  validateProductQuery,
  validatePriceRange,
  productController.getAllProducts
);
router.get("/:id", productController.getProductById);

router.post(
  "/create",
  authenticateToken,
  requireStoreOrAdmin,
  productController.createProduct
);
router.post(
  "/bulk",
  authenticateToken,
  requireStoreOrAdmin,
  productController.createManyProducts
);
router.put(
  "/:id",
  authenticateToken,
  requireStoreOrAdmin,
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticateToken,
  requireStoreOrAdmin,
  productController.deleteProduct
);

export default router;
