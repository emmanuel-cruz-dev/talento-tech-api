import { NextFunction, Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { swaggerSpec } from "../docs/swagger.js";
import { OpenAPIV3 } from "openapi-types";

export interface SwaggerSpec extends OpenAPIV3.Document {
  servers?: OpenAPIV3.ServerObject[];
}

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
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      explorer: true,
      customSiteTitle: "Talento Tech API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        tryItOutEnabled: true,
        urls: isProduction
          ? [
              {
                url: "/api/v1/docs/swagger.json",
                name: "Producción",
              },
            ]
          : undefined,
      },
      customCss: ".swagger-ui .topbar { display: none }",
    };

    if (!isProduction) {
      swaggerSpec.servers = [
        {
          url: "http://localhost:3000/api/v1",
          description: "Local",
        },
      ];
    }

    return swaggerUi.setup(swaggerSpec, options)(req, res, next);
  }
);

router.get("/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default router;
