import { User } from "./user.type.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
