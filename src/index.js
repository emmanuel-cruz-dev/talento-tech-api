import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import router from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(cors());
// app.use("/api/products", router);

// JSON Parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h1>Hola mundo!</h1>
    <p>Visita la API de productos en este <a href="http://localhost:3000/api/products/">link</a>.</p>
    `);
});

// Handling routes not found (404)
app.use((req, res, next) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

// Middleware for general error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Ocurrió un error en el servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
});
