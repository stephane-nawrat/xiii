// ==========================================
// XIII Backend - User Routes
// ==========================================
// Définit les endpoints HTTP pour les users
// Toutes les routes sont protégées : verifyToken + checkRole(1)
// Toutes les routes ici seront préfixées par /users dans router.js

// === Imports ===
import express from "express";
import userController from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";
import {
  validateUserCreate,
  validateUserUpdate,
  checkValidation,
} from "../middlewares/validation.middleware.js";

// === Création Router ===
const router = express.Router();

// === Routes CRUD Users ===
// IMPORTANT : Routes spécifiques AVANT routes avec paramètres
// Toutes les routes protégées : verifyToken + checkRole(1) (admin uniquement)

// GET /api/users
// Lecture : liste tous les utilisateurs
// Pas de validation body (pas de données envoyées)
router.get(
  "/",
  verifyToken, // 1. JWT valide ?
  checkRole(1), // 2. Role admin ?
  userController.getAll, // 3. Retourner la liste
);

// POST /api/users
// Écriture : crée un nouvel utilisateur
// Validation body : email, password, firstname, lastname, role_id
router.post(
  "/",
  verifyToken, // 1. JWT valide ?
  checkRole(1), // 2. Role admin ?
  validateUserCreate, // 3. Données valides ?
  checkValidation, // 4. Erreurs ? → 400 : continuer
  userController.create, // 5. Insérer en BDD
);

// GET /api/users/:id
// Lecture : récupère un utilisateur par son ID
// Pas de validation body (pas de données envoyées)
router.get(
  "/:id",
  verifyToken, // 1. JWT valide ?
  checkRole(1), // 2. Role admin ?
  userController.getOne, // 3. Retourner le user
);

// PUT /api/users/:id
// Écriture : met à jour un utilisateur existant
// Validation body : email, firstname, lastname, role_id, is_active (tous optionnels)
router.put(
  "/:id",
  verifyToken, // 1. JWT valide ?
  checkRole(1), // 2. Role admin ?
  validateUserUpdate, // 3. Données valides ?
  checkValidation, // 4. Erreurs ? → 400 : continuer
  userController.update, // 5. Modifier en BDD
);

// DELETE /api/users/:id
// Suppression : supprime un utilisateur par son ID
// Pas de validation body (suppression par ID uniquement)
router.delete(
  "/:id",
  verifyToken, // 1. JWT valide ?
  checkRole(1), // 2. Role admin ?
  userController.delete, // 3. Supprimer en BDD
);

// === Export ===
export default router;
