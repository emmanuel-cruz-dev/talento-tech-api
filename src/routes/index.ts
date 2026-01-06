import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { swaggerSpec } from "../docs/swagger.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.get("/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: "Talento Tech API Docs",
  swaggerOptions: {
    url: "/api/v1/docs/swagger.json",
  },
};

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(null, swaggerUiOptions));

export default router;
