// ==========================================
// XIII Backend - Auth Service
// ==========================================
// Gestion de l'authentification : passwords et JWT tokens
// Centralisé pour réutilisation dans controllers

// === Imports ===
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// === Classe AuthService ===
class AuthService {
  // === Méthode : hashPassword ===
  // Hash un mot de passe avec Argon2
  // Paramètre: plainPassword (string) - Le mot de passe en clair
  // Retour: string - Le hash Argon2
  async hashPassword(plainPassword) {
    try {
      // Argon2 génère automatiquement un salt unique
      const hash = await argon2.hash(plainPassword);
      return hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Password hashing failed");
    }
  }

  // === Méthode : verifyPassword ===
  // Compare un mot de passe en clair avec son hash
  // Paramètres: plainPassword (string), hash (string)
  // Retour: boolean - true si match, false sinon
  async verifyPassword(plainPassword, hash) {
    try {
      // Argon2 compare automatiquement avec le salt inclus dans le hash
      const isValid = await argon2.verify(hash, plainPassword);
      return isValid;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }

  // === Méthode : generateToken ===
  // Génère un JWT token pour un user
  // Paramètre: user (object) - Objet user avec au moins { id, email, role_id }
  // Retour: string - Le JWT token
  generateToken(user) {
    try {
      // Payload = données stockées DANS le token
      const payload = {
        user_id: user.id,
        email: user.email,
        role_id: user.role_id,
      };

      // Secret depuis variables d'environnement
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET not defined in environment");
      }

      // Options du token
      const options = {
        expiresIn: "24h", // Token valide 24 heures
      };

      // Génération du token
      const token = jwt.sign(payload, secret, options);
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      throw new Error("Token generation failed");
    }
  }

  // === Méthode : verifyToken ===
  // Vérifie et décode un JWT token
  // Paramètre: token (string) - Le JWT token à vérifier
  // Retour: object - Le payload décodé { user_id, email, role_id }
  // Throw: Error si token invalide ou expiré
  verifyToken(token) {
    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET not defined in environment");
      }

      // Vérifie la signature et décode
      // Throw automatiquement si token invalide ou expiré
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      // jwt.verify throw des erreurs spécifiques
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }
}

// === Export ===
// Export singleton (une seule instance)
export default new AuthService();
