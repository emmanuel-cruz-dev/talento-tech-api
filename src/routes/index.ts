import { NextFunction, Request, Response, Router } from "express";
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
  (req: Request, res: Response, next: NextFunction) => {
    const specForSetup = JSON.parse(JSON.stringify(swaggerSpec));

    const isProduction = process.env.NODE_ENV === "production";
    const serverUrl = isProduction
      ? "https://talento-tech-api.vercel.app/api/v1"
      : `http://${req.headers.host}/api/v1`;

    specForSetup.servers = [
      {
        url: serverUrl,
        description: isProduction ? "Producción" : "Desarrollo",
      },
    ];

    const swaggerUiHandler = swaggerUi.setup(specForSetup, {
      explorer: true,
      customSiteTitle: "Talento Tech API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        tryItOutEnabled: true,
      },
      customCss: ".swagger-ui .topbar { display: none }",
    });

    return swaggerUiHandler(req, res, next);
  }
);

router.get("/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default router;
