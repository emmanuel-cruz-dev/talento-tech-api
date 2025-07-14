import { Router } from "express";
import productController from "../controllers/product.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const router = Router();

router
  .get("/", authenticateToken, productController.getAllProducts)
  .get("/:id", authenticateToken, productController.getProductById)
  .post("/create", authenticateToken, productController.createProduct)
  .delete("/:id", authenticateToken, productController.deleteProduct);

export default router;
