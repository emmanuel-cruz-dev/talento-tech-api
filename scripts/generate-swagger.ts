import swaggerJSDoc from "swagger-jsdoc";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Talento Tech API",
    version: "1.0.0",
    description:
      "Esta API proporciona un sistema completo de gestión de productos y usuarios con autenticación JWT.",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local",
    },
    {
      url: "https://talento-tech-api.vercel.app/api/v1",
      description: "Producción",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Endpoints de autenticación (registro, login, perfil)",
    },
    {
      name: "Users",
      description: "Gestión de usuarios (solo ADMIN)",
    },
    {
      name: "Products",
      description:
        "CRUD de productos (público para ver, STORE/ADMIN para modificar)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Ingresa tu token JWT obtenido del login o registro",
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Token de acceso faltante o inválido",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Token requerido",
                },
                message: {
                  type: "string",
                  example: "Debes proporcionar un token de autenticación",
                },
              },
            },
          },
        },
      },
      ForbiddenError: {
        description: "No tienes permisos para realizar esta acción",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Acceso denegado",
                },
                message: {
                  type: "string",
                  example: "Necesitas rol admin para acceder a este recurso",
                },
                yourRole: {
                  type: "string",
                  example: "user",
                },
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/docs/paths/*.ts",
    "./src/docs/schemas/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const outputPath = join(process.cwd(), "public", "swagger-spec.json");
writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log("✅ Swagger spec generado en:", outputPath);
