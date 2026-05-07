// ==========================================
// XIII Backend - User Controller
// ==========================================
// Orchestration des requêtes HTTP pour les users
// Fait le lien entre routes et models

// === Import ===
import models from "../models/registry.js";

// === Classe UserController ===
class UserController {
  // === Méthode : getAll ===
  // GET /api/users - Récupère tous les utilisateurs
  // Paramètres: req (requête HTTP), res (réponse HTTP)
  // Retour: JSON array de tous les users ou erreur 500
  async getAll(req, res) {
    try {
      // Appelle findAll() du UserModel via registry
      const users = await models.user.findAll();

      // Retourne les users avec status 200 (OK)
      res.status(200).json(users);
    } catch (error) {
      // Log l'erreur serveur
      console.error("Error in getAll:", error);

      // Retourne erreur 500 (Internal Server Error)
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  }

  // === Méthode : getOne ===
  // GET /api/users/:id - Récupère un utilisateur par son ID
  // Paramètres: req (contient params.id), res
  // Retour: JSON user, 404 si inexistant, ou erreur 500
  async getOne(req, res) {
    try {
      // Extrait l'ID depuis les paramètres d'URL
      const { id } = req.params;

      // Appelle find(id) du UserModel
      const user = await models.user.find(id);

      // Si user n'existe pas (null/undefined)
      if (!user) {
        return res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }

      // Retourne le user trouvé avec status 200
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in getOne:", error);
      res.status(500).json({
        message: "Error fetching user",
        error: error.message,
      });
    }
  }

  // === Méthode : create ===
  // POST /api/users - Crée un nouvel utilisateur
  // Paramètres: req (contient body avec données user), res
  // Retour: JSON avec ID créé et status 201, ou erreur 500
  async create(req, res) {
    try {
      // Extrait les données depuis le corps de la requête
      const { email, password_hash, firstname, lastname, role_id, is_active } =
        req.body;

      // Appelle insert() du UserModel avec objet user
      const insertId = await models.user.insert({
        email,
        password_hash,
        firstname,
        lastname,
        role_id,
        is_active,
      });

      // Retourne succès avec l'ID du nouvel user (status 201 = Created)
      res.status(201).json({
        message: "User created successfully",
        id: insertId,
      });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  // === Méthode : update ===
  // PUT /api/users/:id - Met à jour un utilisateur existant
  // Paramètres: req (contient params.id + body avec données), res
  // Retour: JSON succès, 404 si inexistant, ou erreur 500
  async update(req, res) {
    try {
      // Extrait l'ID depuis l'URL
      const { id } = req.params;

      // Extrait les données à modifier depuis le body
      const { email, firstname, lastname, role_id, is_active } = req.body;

      // Appelle update() du UserModel
      // Retourne le nombre de lignes modifiées (0 ou 1)
      const affectedRows = await models.user.update({
        id,
        email,
        firstname,
        lastname,
        role_id,
        is_active,
      });

      // Si aucune ligne modifiée = user inexistant
      if (affectedRows === 0) {
        return res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }

      // Retourne succès avec status 200
      res.status(200).json({
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json({
        message: "Error updating user",
        error: error.message,
      });
    }
  }

  // === Méthode : delete ===
  // DELETE /api/users/:id - Supprime un utilisateur
  // Paramètres: req (contient params.id), res
  // Retour: JSON succès, 404 si inexistant, ou erreur 500
  async delete(req, res) {
    try {
      // Extrait l'ID depuis l'URL
      const { id } = req.params;

      // Appelle delete() du UserModel
      // Retourne le nombre de lignes supprimées (0 ou 1)
      const affectedRows = await models.user.delete(id);

      // Si aucune ligne supprimée = user inexistant
      if (affectedRows === 0) {
        return res.status(404).json({
          message: `User with id ${id} not found`,
        });
      }

      // Retourne succès avec status 200
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({
        message: "Error deleting user",
        error: error.message,
      });
    }
  }
}

// === Export ===
// Exporte une instance unique de UserController (singleton)
export default new UserController();
