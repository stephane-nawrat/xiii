// ==========================================
// XIII Frontend - Auth Context
// ==========================================
// Gestion globale de l'authentification
// Fournit user, token, login, logout à toute l'application

import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// === Créer le Context ===
// Context = conteneur de state global
// null = valeur par défaut (remplacée par le Provider)
const AuthContext = createContext(null);

// === AuthProvider Component ===
// Enveloppe l'application et fournit le state auth à tous les composants enfants
// Usage: <AuthProvider><App /></AuthProvider> dans main.jsx
export function AuthProvider({ children }) {
  
  // === États ===
  // user: données utilisateur connecté (null si déconnecté)
  // Structure: { user_id, email, role_id }
  const [user, setUser] = useState(null);
  
  // loading: true pendant la vérification initiale du token
  // Permet d'afficher un spinner au lieu de la page vide
  const [loading, setLoading] = useState(true);

  // === useEffect : Vérification Token au Chargement ===
  // Exécuté UNE FOIS quand le composant monte
  // Vérifie si un token existe dans localStorage
  // Décoder localement d'abord (instantané), puis vérifier l'API en background
  useEffect(() => {
    // Récupérer le token stocké
    const token = authService.getToken();
    
    if (token) {
      // Token existe → décoder localement AVANT l'API call
      // = Instantané, pas de délai, pas de flash blanc
      const decoded = authService.decodeToken(token);
      
      if (decoded) {
        // Token décodable → setUser immédiatement
        // L'utilisateur voit la page tout de suite
        setUser(decoded);
        setLoading(false);
        
        // Vérifier la validité du token avec l'API en arrière-plan
        // Si le token est expiré, l'API renverra 401 et on logout
        authService.getProfile().catch(() => {
          // Token invalide/expiré → logout silencieux
          authService.logout();
          setUser(null);
        });
      } else {
        // Token corrompu (impossible à décoder)
        authService.logout();
        setLoading(false);
      }
    } else {
      // Pas de token → utilisateur non connecté
      // Pas besoin de vérifier l'API, on skip direct
      setLoading(false);
    }
  }, []); // [] = exécuté une seule fois au montage

  // === Fonction : login ===
  // Authentifie l'utilisateur avec email/password
  // Paramètres: email (string), password (string)
  // Retourne: { success: true } OU { success: false, error: "message" }
  const login = async (email, password) => {
    try {
      // Appel API POST /auth/login
      const data = await authService.login(email, password);
      // data = { token: "...", user: { user_id, email, role_id } }
      
      // Stocker le token dans localStorage
      localStorage.setItem('token', data.token);
      
      // Mettre à jour le state user
      setUser(data.user);
      
      // Retourner succès
      return { success: true };
      
    } catch (error) {
      // Erreur (mauvais credentials, serveur down, etc.)
      // Retourner l'erreur pour affichage dans le formulaire
      return { success: false, error: error.message };
    }
  };

  // === Fonction : logout ===
  // Déconnecte l'utilisateur
  // Supprime token du localStorage et reset le state user
  const logout = () => {
    // Supprimer token du localStorage
    authService.logout();
    
    // Reset state user à null
    setUser(null);
  };

  // === Valeur Fournie aux Composants ===
  // Tous les composants enfants peuvent accéder à ces valeurs via useAuth()
  const value = {
    user,                      // Données user (null si déconnecté)
    loading,                   // État loading initial
    login,                     // Fonction pour se connecter
    logout,                    // Fonction pour se déconnecter
    isAuthenticated: !!user    // Boolean: true si user existe
  };

  // === Écran de Chargement ===
  // Affiché pendant la vérification initiale du token
  // Avec l'optimisation, ce spinner n'apparaît presque jamais
  // (seulement si pas de token ou token corrompu)
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        {/* Spinner centré */}
        <svg className="animate-spin h-8 w-8 text-carbon" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  // === Rendu du Provider ===
  // Fournit les valeurs à tous les composants enfants
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// === Hook Personnalisé : useAuth ===
// Permet d'accéder facilement au context dans n'importe quel composant
// Usage: const { user, login, logout } = useAuth();
export function useAuth() {
  // Récupérer le context
  const context = useContext(AuthContext);
  
  // Vérifier que useAuth est bien utilisé dans un AuthProvider
  // Erreur si appelé en dehors (protection)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}