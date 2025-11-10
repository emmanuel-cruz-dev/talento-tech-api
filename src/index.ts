import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";
import productRoutes from "./routes/product.routes.ts";
import authRoutes from "./routes/auth.routes.ts";

dotenv.config();

// Get __dirname on ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(cors());

// JSON Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  try {
    const htmlPath = join(__dirname, "views", "home.html");
    const htmlContent = readFileSync(htmlPath, "utf8");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error cargando HTML:", error);
    res.status(500).json({ error: "Error cargando página" });
  }
});

// Routes
app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);

// Handling routes not found (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `No se encontró la ruta '${req.originalUrl}'`,
  });
});

// Middleware for general error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Ocurrió un error en el servidor",
    message: err.message || "Algo salió mal",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
});
