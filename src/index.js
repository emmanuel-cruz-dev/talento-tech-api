import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(cors());

// JSON Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>Hola mundo!</h1>
    <p>Visita la API de productos en este <a href="http://localhost:3000/api/products/">link</a>.</p>
    `);
});

// Routes
app.use("/api/products", router);

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
