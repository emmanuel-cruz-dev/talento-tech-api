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

router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Talento Tech API Docs",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

export default router;
