// ==========================================
// XIII Backend - Auth Middleware
// ==========================================
// Vérifie le JWT token pour protéger les routes

// === Import ===
import authService from "../services/AuthService.js";

// === Middleware : verifyToken ===
// Vérifie la présence et validité du JWT token
// Headers attendu: Authorization: "Bearer token"
// Si valide: attache req.user = decoded payload
// Si invalide: retourne 401
const verifyToken = (req, res, next) => {
  try {
    // 1. Extraire le token du header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    // 2. Parser le format "Bearer token"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        error: "Invalid token format",
      });
    }

    const token = parts[1];

    // 3. Vérifier le token avec AuthService
    const decoded = authService.verifyToken(token);

    // 4. Attacher les infos user à la requête
    req.user = decoded;

    // 5. Passer au middleware/controller suivant
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

// === Export ===
export { verifyToken };
