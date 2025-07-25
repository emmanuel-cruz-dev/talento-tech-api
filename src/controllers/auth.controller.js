import { config } from "dotenv";
import jwt from "jsonwebtoken";
import validateUser from "../services/auth.service.js";

config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username y password son requeridos" });
    }

    const userValid = await validateUser(username, password);

    if (!userValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.log("Error al loguearse:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default { login };
