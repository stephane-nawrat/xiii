// ==========================================
// XIII Backend - Admin Routes
// ==========================================
// Routes administration (réservées aux admins)

// === Imports ===
// → Pour créer le router
import express from "express";
// → Les méthodes dashboard() et getUsers()
import adminController from "../controllers/AdminController.js";
// → Vérifier JWT (authentification)
import { verifyToken } from "../middlewares/auth.middleware.js";
// → Vérifier rôle (autorisation)
import { checkRole } from "../middlewares/role.middleware.js";

// === Router ===
const router = express.Router();

// === Routes ===

// Toutes les routes admin nécessitent :
// 1. verifyToken (JWT valide)
// 2. checkRole(1) (role admin)

// GET /api/admin/dashboard - Statistiques admin
router.get(
  "/dashboard",
  verifyToken, // Middleware 1 : vérifie JWT
  checkRole(1), // Middleware 2 : vérifie role = 1 (admin)
  adminController.dashboard,
);

// GET /api/admin/users - Liste tous les users
router.get("/users", verifyToken, checkRole(1), adminController.getUsers);

// === Export ===
export default router;
