// ==========================================
// XIII Backend - Server Entry Point
// ==========================================

import "dotenv/config"; // Charge les variables d'environnement
import app from "./src/app.js";
import pool from "./database/pool.js"; // ← AJOUTER

// === Configuration du Port ===
const PORT = process.env.PORT || 3001;

// === Démarrage du Serveur ===
app.listen(PORT, () => {
  console.log(`XIII API Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`,
  );
});

// === Gestion des Erreurs Non Capturées ===
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});
