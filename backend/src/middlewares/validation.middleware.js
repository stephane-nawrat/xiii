// ==========================================
// XIII Backend - Validation Middleware
// ==========================================
// Règles de validation des données entrantes
// Utilise express-validator pour valider req.body
// Appliqué sur les routes POST et PUT de /api/users

// === Import ===
// body          : définir des règles sur les champs du body
// validationResult : lire les erreurs après validation
import { body, validationResult } from "express-validator";

// === Validation : création user ===
// Tableau de règles appliquées sur req.body
// Chaque règle vérifie un champ spécifique
// Utilisé sur POST /api/users
export const validateUserCreate = [
  // Règle 1 : email
  // Supprime les espaces, vérifie le format email, normalise
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // Règle 2 : password
  // Minimum 6 caractères
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // Règle 3 : firstname
  // Obligatoire, pas vide, max 100 caractères (aligné sur schema.sql)
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First name too long"),

  // Règle 4 : lastname
  // Obligatoire, pas vide, max 100 caractères (aligné sur schema.sql)
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name too long"),

  // Règle 5 : role_id
  // Doit être un entier entre 2 et 4
  // BLOQUE la création d'admin (role_id = 1 interdit)
  body("role_id")
    .isInt({ min: 2, max: 4 })
    .withMessage("Invalid role - only photographer, visitor or guest allowed"),
];

// === Validation : modification user ===
// Règles optionnelles pour PUT /api/users/:id
// Tous les champs sont optionnels (on ne modifie que ce qui est envoyé)
// Pas de règle password (pas de modification password via ce endpoint)
export const validateUserUpdate = [
  // email optionnel mais valide si présent
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // firstname optionnel mais valide si présent
  body("firstname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First name too long"),

  // lastname optionnel mais valide si présent
  body("lastname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name too long"),

  // role_id optionnel mais entre 2 et 4 si présent
  // BLOQUE l'escalade de privilèges (role_id = 1 interdit)
  body("role_id")
    .optional()
    .isInt({ min: 2, max: 4 })
    .withMessage("Invalid role - only photographer, visitor or guest allowed"),

  // is_active optionnel, doit être un boolean
  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active must be a boolean"),
];

// === Middleware : checkValidation ===
// Lit les erreurs enregistrées par les règles de validation
// Si erreurs → retourne 400 avec le détail des erreurs
// Si pas d'erreurs → next() → controller
export const checkValidation = (req, res, next) => {
  // Je lis toutes les erreurs accumulées par les règles
  const errors = validationResult(req);

  // S'il y a des erreurs → je bloque et retourne 400
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((e) => ({
        field: e.path, // Le champ concerné (email, password...)
        message: e.msg, // Le message d'erreur défini dans les règles
      })),
    });
  }

  // Pas d'erreurs → je laisse passer vers le controller
  next();
};
