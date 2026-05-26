// ==========================================
// XIII Frontend - SlidePanel Component
// ==========================================
// Panel réutilisable qui glisse de la droite
// Utilisé pour forms, détails, etc.

// === IMPORTS ===
import { X } from 'lucide-react';

function SlidePanel({ isOpen, onClose, title, children }) {
  // === PROPS ===
  // isOpen: boolean - true = panel visible, false = caché
  // onClose: function - callback quand user ferme panel
  // title: string - titre affiché en header
  // children: React nodes - contenu du panel (form, etc.)

  // Si panel fermé, ne rien render (optimisation)
  if (!isOpen) return null;

  return (
    <>
      {/* === OVERLAY === */}
      {/* Fond grisé transparent qui couvre toute la page */}
      <div 
        className="fixed inset-0 bg-carbon/50 z-40 transition-opacity"
        onClick={onClose}  // Click overlay → ferme panel
        aria-hidden="true"
      />

      {/* === PANEL === */}
      {/* Container qui glisse de droite */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md">
        <div className="h-full flex flex-col bg-cream shadow-xl">
          
          {/* === HEADER === */}
          {/* Titre + Bouton fermeture */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-carbon">
              {title}
            </h2>
            
            {/* Bouton X fermeture */}
            <button
              onClick={onClose}
              className="text-gray-text hover:text-carbon transition-colors"
              aria-label="Close panel"
            >
              <X size={24} />
            </button>
          </div>

          {/* === BODY === */}
          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}  {/* Contenu passé en props */}
          </div>

        </div>
      </div>
    </>
  );
}

export default SlidePanel;