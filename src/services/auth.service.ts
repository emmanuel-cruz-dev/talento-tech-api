import bcrypt from "bcrypt";
import { users } from "../models/user.model";

const validateUser = async (username: string, password: string) => {
  try {
    const user = users.find((u) => u.username === username);

    if (!user) {
      console.log(`Usuario ${username} no encontrado`);
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`Contraseña incorrecta para usuario ${username}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validando usuario:", error);
    return false;
  }
};

export default validateUser;
