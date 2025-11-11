import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "views")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "./views", "home.html"));
});

app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `No se encontró la ruta '${req.originalUrl}'`,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Ocurrió un error en el servidor",
    message: err.message || "Algo salió mal",
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port http://localhost:${PORT}`);
  });
}

export default app;
