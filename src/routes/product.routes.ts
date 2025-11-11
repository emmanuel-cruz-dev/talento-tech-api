import { Router } from "express";
import productController from "../controllers/product.controller";
import authenticateToken from "../middlewares/auth.middleware";
import {
  validateProductQuery,
  validatePriceRange,
} from "../middlewares/validateQuery.middleware";

const router = Router();

router
  .get(
    "/",
    validateProductQuery,
    validatePriceRange,
    productController.getAllProducts
  )
  .get("/:id", productController.getProductById)
  .post("/create", authenticateToken, productController.createProduct)
  .delete("/:id", authenticateToken, productController.deleteProduct)
  .post("/bulk", authenticateToken, productController.createManyProducts);

export default router;
