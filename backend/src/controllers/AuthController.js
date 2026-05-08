// ==========================================
// XIII Backend - Auth Controller
// ==========================================
// Gestion des requêtes HTTP d'authentification

// === Imports ===
import authService from "../services/AuthService.js";
import models from "../models/registry.js";

// === Classe AuthController ===
class AuthController {
  // === Méthode : login ===
  // POST /api/auth/login
  // Body: { email, password }
  // Retour: { message, token, user }
  async login(req, res) {
    try {
      // 1. Extraction des données du body
      const { email, password } = req.body;

      // 2. Chercher le user par email
      const user = await models.user.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      // 3. Vérifier le password
      const isPasswordValid = await authService.verifyPassword(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      // 4. Générer le JWT token
      const token = authService.generateToken({
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      });

      // 5. Réponse succès
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role_id: user.role_id,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  // === Méthode : profile ===
  // GET /api/auth/profile
  // Headers: { Authorization: "Bearer token" }
  // Retour: { user }
  async profile(req, res) {
    try {
      // 1. Récupérer user_id depuis req.user (mis par middleware)
      const { user_id } = req.user;

      // 2. Chercher le user complet en BDD
      const user = await models.user.findById(user_id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // 3. Retourner les infos user (sans password_hash)
      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role_id: user.role_id,
          is_active: user.is_active,
          created_at: user.created_at,
        },
      });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

// === Export ===
export default new AuthController();
