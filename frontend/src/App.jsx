// ==========================================
// XIII Frontend - App Component
// ==========================================
// Composant racine de l'application React

function App() {
  return (
    // Container principal
    // min-h-screen: hauteur minimum = 100% viewport
    // bg-cream: background couleur crème (#EFEEE6)
    // flex items-center justify-center: centrage vertical + horizontal
    <div className="min-h-screen bg-cream flex items-center justify-center">
      
      {/* Zone de contenu centrée */}
      <div className="text-center">
        
        {/* Titre principal */}
        {/* text-6xl: taille 60px, font-bold: graisse 700, text-carbon: noir (#0C0C0C) */}
        <h1 className="text-6xl font-bold text-carbon mb-4">
          XIII
        </h1>
        
        {/* Sous-titre */}
        {/* text-xl: taille 20px, text-gray-text: gris (#676664) */}
        <p className="text-xl text-gray-text">
          Frontend Vite + React 18 + Tailwind 3
        </p>
        
      </div>
    </div>
  );
}

// Export pour utilisation dans main.jsx
export default App;