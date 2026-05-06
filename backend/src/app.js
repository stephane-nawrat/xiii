// ==========================================
// XIII Backend - Express Application Configuration
// ==========================================

import express from "express";
import cors from "cors";
import router from "./routes/router.js";

// === Initialisation de l'Application ===
const app = express();

// === Middlewares Globaux ===

// 1. CORS - Autorise les requêtes du frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);

// 2. Parser JSON - Parse le body des requêtes
app.use(express.json());

// 3. Parser URL-encoded - Parse les formulaires
app.use(express.urlencoded({ extended: true }));

// === Logging Middleware (dev) ===
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
  });
}

// === Routes ===
app.use("/api", router);

// === 404 Handler ===
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// === Error Handler ===
app.use((err, _req, res, _next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
