// ==========================================
// XIII Backend - Role Middleware
// ==========================================
// Vérifie que l'utilisateur a le rôle requis

// === Middleware : checkRole ===
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // 1. Vérifier que l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    // 2. Vérifier le rôle
    if (req.user.role_id !== requiredRole) {
      return res.status(403).json({
        error: "Forbidden - Insufficient permissions",
      });
    }

    // 3. Autoriser l'accès
    next();
  };
};

// === Export ===
export { checkRole };
