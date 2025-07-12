import express from "express";
import cors from "cors";
// import router from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use("/api/products", router);

app.get("/", (req, res) => {
  res.send(`
    <h1>Hola mundo!</h1>
    <p>Visita la API de productos en este <a href="http://localhost:3000/api/products/">link</a>.</p>
    `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port http://localhost:${PORT}`);
});
