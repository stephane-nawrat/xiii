// ==========================================
// XIII Backend - User Routes
// ==========================================
// Définit les endpoints HTTP pour les users
// Toutes les routes ici seront préfixées par /users dans router.js

// === Imports ===
import express from "express";
import userController from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

// === Création Router ===
const router = express.Router();

// === Routes CRUD Users ===
// IMPORTANT : Routes spécifiques AVANT routes avec paramètres
// Toutes les routes protégées : verifyToken + checkRole(1) (admin uniquement)

// GET /api/users - Liste tous les utilisateurs
router.get("/", verifyToken, checkRole(1), userController.getAll);

// POST /api/users - Crée un nouvel utilisateur
router.post("/", verifyToken, checkRole(1), userController.create);

// GET /api/users/:id - Récupère un utilisateur par ID
router.get("/:id", verifyToken, checkRole(1), userController.getOne);

// PUT /api/users/:id - Met à jour un utilisateur
router.put("/:id", verifyToken, checkRole(1), userController.update);

// DELETE /api/users/:id - Supprime un utilisateur
router.delete("/:id", verifyToken, checkRole(1), userController.delete);

// === Export ===
export default router;
