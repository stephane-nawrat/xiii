// ==========================================
// XIII Frontend - API Service
// ==========================================
// Configuration centralisée Axios pour appels API

import axios from "axios";

// === Configuration Axios ===
// baseURL: URL de base de l'API backend
// Toutes les requêtes utiliseront cette base
// Exemple: axios.get('/health') → http://localhost:3001/api/health
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// === Intercepteur Request ===
// Exécuté AVANT chaque requête
// Ajoute automatiquement le token JWT si présent
api.interceptors.request.use(
  (config) => {
    // Récupérer le token du localStorage
    const token = localStorage.getItem("token");

    // Si token existe, l'ajouter au header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Gestion erreur requête
    return Promise.reject(error);
  },
);

// === Intercepteur Response ===
// Exécuté APRÈS chaque réponse
// Gère les erreurs globalement (ex: token expiré → logout auto)
api.interceptors.response.use(
  (response) => {
    // Réponse OK (2xx) → retourner directement
    return response;
  },
  (error) => {
    // Erreur 401 (Unauthorized) → Token expiré ou invalide
    if (error.response?.status === 401) {
      // Supprimer token invalide
      localStorage.removeItem("token");

      // Rediriger vers login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

// === Export ===
export default api;
