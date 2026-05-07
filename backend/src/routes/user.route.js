// ==========================================
// XIII Backend - User Routes
// ==========================================
// Définit les endpoints HTTP pour les users

// === Imports ===
import express from "express";
import userController from "../controllers/UserController.js";

// === Création Router ===
const router = express.Router();

// === Routes CRUD Users ===

// GET /api/users - Liste tous les utilisateurs
router.get("/users", userController.getAll);
// GET /api/users/:id - Récupère un utilisateur par ID
router.get("/users/:id", userController.getOne);
// POST /api/users - Crée un nouvel utilisateur
router.post("/users", userController.create);
// PUT /api/users/:id - Met à jour un utilisateur
router.put("/users/:id", userController.update);
// DELETE /api/users/:id - Supprime un utilisateur
router.delete("/users/:id", userController.delete);

// === Export ===
export default router;
