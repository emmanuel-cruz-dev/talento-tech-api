import { Router } from "express";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.get("/docs", (req, res) => {
  res.sendFile(join(process.cwd(), "public", "swagger.html"));
});

router.get("/docs/swagger.json", (req, res) => {
  const specPath = join(process.cwd(), "public", "swagger-spec.json");
  const spec = JSON.parse(readFileSync(specPath, "utf-8"));
  res.json(spec);
});

export default router;
