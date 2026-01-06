import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { join } from "node:path";
import apiv1Routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(process.cwd(), "public", "home.html"));
});

app.use("/api/v1", apiv1Routes);

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

export default app;
