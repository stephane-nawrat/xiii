// ==========================================
// XIII Backend - Registry (Dependency Injection)
// ==========================================
// Centralise les instances de models avec injection du pool
// Utilise un Proxy pour erreurs explicites si model non enregistré

// === 1. Import du Pool ===
import pool from "../../database/pool.js";

// === 2. Enregistrement des Models ===
const models = {};

// --- UserModel ---
import UserModel from "./UserModel.js";
models.user = new UserModel();
models.user.setDatabase(pool);

// --- Futurs models à ajouter ici ---
// import RoleModel from './RoleModel.js';
// models.role = new RoleModel();
// models.role.setDatabase(pool);

// === 3. Protection via Proxy ===
// Intercepte l'accès aux propriétés inexistantes
const handler = {
  get(obj, prop) {
    // Si la propriété existe, la retourner
    if (prop in obj) {
      return obj[prop];
    }

    // Sinon, erreur explicite
    throw new ReferenceError(
      `models.${prop} is not defined. Did you forget to register it in src/models/registry.js?`,
    );
  },
};

// === Export avec Proxy ===
export default new Proxy(models, handler);
