import express from "express";

const router = express.Router();

router
  .get("/", getProducts)
  .get("/:productId", getProductById)
  .post("/", createProduct)
  .delete("/:id", deleteProduct);

export default router;
