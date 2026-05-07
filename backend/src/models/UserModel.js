// ==========================================
// XIII Backend - User Model
// ==========================================
// Gestion des opérations CRUD spécifiques à la table users
// Hérite des méthodes de base (findAll, find, delete) d'AbstractModel

// === Import ===
import AbstractModel from "./AbstractModel.js";

// === Classe UserModel ===
class UserModel extends AbstractModel {
  // --- Constructor ---
  // Définit la table 'users' pour ce model
  constructor() {
    super({ table: "users" });
  }

  // === Méthode : insert(user) ===
  // Insère un nouvel utilisateur dans la base
  // Paramètre: user (objet avec email, password_hash, firstname, lastname, role_id, is_active)
  // Retour: ID du nouvel utilisateur créé
  async insert(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password_hash, firstname, lastname, role_id, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.password_hash,
        user.firstname,
        user.lastname,
        user.role_id,
        user.is_active,
      ],
    );
    return result.insertId;
  }

  // === Méthode : update(user) ===
  // Met à jour un utilisateur existant
  // Paramètre: user (objet avec id + champs à modifier)
  // Retour: Nombre de lignes modifiées (0 si ID inexistant, 1 si succès)
  async update(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, firstname = ?, lastname = ?, role_id = ?, is_active = ? WHERE id = ?`,
      [
        user.email,
        user.firstname,
        user.lastname,
        user.role_id,
        user.is_active,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  // === Méthode : findByEmail(email) ===
  // Recherche un utilisateur par son email (utile pour login)
  // Paramètre: email (string)
  // Retour: Objet user ou undefined si email inexistant
  async findByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email],
    );
    return rows[0];
  }
}

// === Export ===
export default UserModel;
