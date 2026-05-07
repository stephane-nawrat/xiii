// ==========================================
// XIII Backend - User Routes
// ==========================================
// Définit les endpoints HTTP pour les users
// Toutes les routes ici seront préfixées par /users dans router.js

// === Imports ===
import express from "express";
import userController from "../controllers/UserController.js";

// === Création Router ===
const router = express.Router();

// === Routes CRUD Users ===
// IMPORTANT : Routes spécifiques AVANT routes avec paramètres

// GET /api/users - Liste tous les utilisateurs
router.get("/", userController.getAll);

// POST /api/users - Crée un nouvel utilisateur
router.post("/", userController.create);

// GET /api/users/:id - Récupère un utilisateur par ID
router.get("/:id", userController.getOne);

// PUT /api/users/:id - Met à jour un utilisateur
router.put("/:id", userController.update);

// DELETE /api/users/:id - Supprime un utilisateur
router.delete("/:id", userController.delete);

// === Export ===
export default router;
