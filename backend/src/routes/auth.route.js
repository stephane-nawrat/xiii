// ==========================================
// XIII Backend - Auth Routes
// ==========================================
// Routes d'authentification

// === Imports ===
import express from "express";
import authController from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
// rateLimit : limite le nombre de requêtes par IP et par fenêtre de temps
// Protège /auth/login contre les attaques par force brute
import rateLimit from "express-rate-limit";

// === Rate Limiter : Login ===
// Limite les tentatives de connexion par IP
// Protection contre les attaques par force brute
// windowMs : fenêtre de temps (15 minutes)
// max      : nombre maximum de tentatives dans cette fenêtre
// message  : réponse retournée si limite dépassée (429 Too Many Requests)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes en millisecondes
  max: 5, // 5 tentatives maximum par IP
  message: {
    error: "Too many login attempts, please try again in 15 minutes",
  },
});

// === Router ===
const router = express.Router();

// === Routes ===

// POST /api/auth/login - Connexion (publique)
// loginLimiter : max 5 tentatives par IP sur 15 minutes
// Protection contre attaques brute-force
router.post("/login", loginLimiter, authController.login);

// GET /api/auth/profile - Profil user (protégée)
router.get("/profile", verifyToken, authController.profile);

// === Export ===
export default router;
