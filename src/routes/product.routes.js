import { Router } from "express";
import productController from "../controllers/product.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router();

router
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .post("/create", authenticateToken, productController.createProduct)
  .delete("/:id", authenticateToken, productController.deleteProduct)
  .post("/bulk", authenticateToken, productController.createManyProducts);

export default router;
