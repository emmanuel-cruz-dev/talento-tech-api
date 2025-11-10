import type { Request, Response } from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import validateUser from "../services/auth.service.ts";

config();

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const userValid = await validateUser(username, password);

    if (!userValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({
        error: "JWT_SECRET is not defined in the environment variables",
      });
    }

    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.log("Error al loguearse:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { login };
