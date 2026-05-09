// ==========================================
// XIII Frontend - Point d'Entrée React
// ==========================================
// Ce fichier initialise l'application React dans le DOM

// === Imports React ===
import { StrictMode } from 'react'        // Mode strict (détecte problèmes potentiels)
import { createRoot } from 'react-dom/client'  // API React 18 pour render

// === Imports Styles & Composants ===
import './index.css'      // Styles globaux (Tailwind)
import App from './App.jsx'  // Composant racine
import { AuthProvider } from './context/AuthContext.jsx' // 

// === Initialisation React ===
// createRoot: crée une "racine" React dans l'élément #root du DOM
// StrictMode: active vérifications supplémentaires en développement
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)