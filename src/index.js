import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

// Get __dirname on ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(cors());

// JSON Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    const htmlPath = path.join(__dirname, "views", "home.html");
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
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `No se encontró la ruta '${req.originalUrl}'`,
  });
});

// Middleware for general error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Ocurrió un error en el servidor",
    message: err.message || "Algo salió mal",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
});
