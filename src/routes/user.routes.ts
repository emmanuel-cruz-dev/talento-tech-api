import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import {
  requireAdmin,
  requireOwnerOrAdmin,
} from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/", requireAdmin, userController.getAllUsers);
router.get("/role/:role", requireAdmin, userController.getUsersByRole);
router.get("/:id", requireOwnerOrAdmin, userController.getUserById);
router.put("/:id", requireOwnerOrAdmin, userController.updateUser);
router.delete("/:id", requireAdmin, userController.deleteUser);
router.patch(
  "/:id/toggle-status",
  requireAdmin,
  userController.toggleUserStatus
);

export default router;
