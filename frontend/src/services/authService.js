// ==========================================
// XIII Frontend - Auth Service
// ==========================================
// Gestion des appels API d'authentification

import api from "./api";

// === Service d'authentification ===
const authService = {
  // === Login ===
  // Authentifie un utilisateur avec email/password
  // Retourne: { token, user: { user_id, email, role_id } }
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      // Extraire le message d'erreur du backend
      const message = error.response?.data?.error || "Login failed";
      throw new Error(message);
    }
  },

  // === Get Profile ===
  // Récupère les infos du user connecté (avec token)
  // Nécessite: token dans localStorage (ajouté auto par interceptor)
  async getProfile() {
    try {
      const response = await api.get("/auth/profile");
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.error || "Failed to get profile";
      throw new Error(message);
    }
  },

  // === Logout ===
  // Supprime le token (côté client uniquement pour l'instant)
  logout() {
    localStorage.removeItem("token");
  },

  // === Get Token ===
  // Récupère le token stocké
  getToken() {
    return localStorage.getItem("token");
  },

  // === Decode Token ===
  // Décode le payload JWT sans vérifier la signature
  // Utile pour récupérer user_id, email, role_id
  decodeToken(token) {
    try {
      // JWT = header.payload.signature
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },
};

export default authService;
