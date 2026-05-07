// ==========================================
// XIII Backend - Main Router
// ==========================================
// Point d'entrée pour toutes les routes de l'API
// Le préfixe /api est déjà ajouté dans app.js

// === Imports ===
import express from "express";
import userRoutes from "./user.route.js";

// === Création Router Principal ===
const router = express.Router();

// === Route Health Check ===
// GET /api/health - Vérification que l'API fonctionne
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "XIII API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// === Montage des Sous-Routers ===
// Routes Users - préfixe /users
router.use("/users", userRoutes);

// Futurs routers à ajouter ici :
// router.use("/auth", authRoutes);
// router.use("/photos", photoRoutes);

// === Export ===
export default router;
