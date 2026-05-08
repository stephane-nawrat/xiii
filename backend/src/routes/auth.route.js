// ==========================================
// XIII Backend - Auth Routes
// ==========================================
// Routes d'authentification

// === Imports ===
import express from "express";
import authController from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// === Router ===
const router = express.Router();

// === Routes ===

// POST /api/auth/login - Connexion (publique)
router.post("/login", authController.login);
// GET /api/auth/profile - Profil user (protégée)
router.get("/profile", verifyToken, authController.profile);

// === Export ===
export default router;
