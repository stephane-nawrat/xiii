// ==========================================
// XIII Backend - Main Router
// ==========================================

import express from "express";

const router = express.Router();

// === Health Check Endpoint ===
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "XIII API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

export default router;
