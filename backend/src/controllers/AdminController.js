// ==========================================
// XIII Backend - Admin Controller
// ==========================================
// Gestion des requêtes admin

// === Imports ===
import models from "../models/registry.js";

class AdminController {
  // === Méthode : dashboard ===
  // GET /api/admin/dashboard
  // Retour: Statistiques admin (users sans admins)
  async dashboard(req, res) {
    try {
      // 1. Récupérer statistiques
      // Total users SANS admins (role_id != 1)
      const [users] = await models.user.database.query(
        "SELECT COUNT(*) as total FROM users WHERE role_id != 1",
      );

      const [photographers] = await models.user.database.query(
        "SELECT COUNT(*) as total FROM users WHERE role_id = 2",
      );

      const [visitors] = await models.user.database.query(
        "SELECT COUNT(*) as total FROM users WHERE role_id = 3",
      );

      const [guests] = await models.user.database.query(
        "SELECT COUNT(*) as total FROM users WHERE role_id = 4",
      );

      // 2. Retourner les stats (pas d'admins dans response)
      res.status(200).json({
        stats: {
          totalUsers: users[0].total, // Total sans admins
          photographers: photographers[0].total,
          visitors: visitors[0].total,
          guests: guests[0].total,
        },
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  // === Méthode : getUsers ===
  // GET /api/admin/users
  // Retour: Liste de tous les users avec leurs rôles
  async getUsers(req, res) {
    try {
      // 1. Récupérer tous les users avec nom du rôle
      const [users] = await models.user.database.query(`
        SELECT 
          u.id,
          u.email,
          u.firstname,
          u.lastname,
          u.role_id,
          r.name as role_name,
          u.is_active,
          u.created_at
        FROM users u
        JOIN roles r ON u.role_id = r.id
        ORDER BY u.created_at DESC
      `);

      // 2. Retourner la liste
      res.status(200).json({
        users,
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}

// === Export ===
export default new AdminController();
