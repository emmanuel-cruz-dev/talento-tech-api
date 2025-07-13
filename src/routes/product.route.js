import express from "express";

const router = express.Router();

router
  .get("/", getAllProducts)
  .get("/:productId", getProductById)
  .post("/", createProduct)
  .delete("/:id", deleteProduct);

export default router;
