// ==========================================
// XIII Frontend - Protected Route Component
// ==========================================
// Protège les routes admin contre l'accès non-authentifié
// Redirige vers /login si l'utilisateur n'est pas connecté

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  // Récupérer l'état d'authentification
  const { isAuthenticated, loading } = useAuth();

  // Pendant le chargement, ne rien afficher (évite flash de redirection)
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
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

  // Si authentifié → afficher la page protégée
  // Sinon → rediriger vers /login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;