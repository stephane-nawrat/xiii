// ==========================================
// XIII Frontend - ConfirmModal Component
// ==========================================
// Modal confirmation réutilisable
// Utilisé pour actions destructives (delete, etc.)

function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm, 
  onCancel,
  danger = false  // true = bouton rouge (delete)
}) {
  // === PROPS ===
  // isOpen: boolean - modal visible ou non
  // title: string - titre modal
  // message: string - message explicatif
  // confirmText: string - texte bouton confirmation (default: "Confirm")
  // cancelText: string - texte bouton annulation (default: "Cancel")
  // onConfirm: function - callback si user confirme
  // onCancel: function - callback si user annule
  // danger: boolean - true = style destructif (rouge)

  // Si fermé, ne rien render
  if (!isOpen) return null;

  return (
    <>
      {/* === OVERLAY === */}
      {/* Fond grisé */}
      <div 
        className="fixed inset-0 bg-carbon/50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}  // Click outside → annule
      >
        
        {/* === MODAL === */}
        {/* Centré viewport */}
        <div 
          className="bg-cream rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}  // Empêche click modal → close
        >
          
          {/* Titre */}
          <h3 className="text-lg font-bold text-carbon mb-3">
            {title}
          </h3>
          
          {/* Message */}
          <p className="text-sm text-gray-text mb-6">
            {message}
          </p>
          
          {/* Boutons Actions */}
          <div className="flex gap-3 justify-end">
            
            {/* Bouton Cancel */}
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-carbon text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              {cancelText}
            </button>
            
            {/* Bouton Confirm */}
            <button
              onClick={onConfirm}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${danger 
                  ? 'bg-red-600 text-white hover:bg-red-700'  // Style destructif
                  : 'bg-carbon text-cream hover:bg-gray-800'  // Style normal
                }
              `}
            >
              {confirmText}
            </button>
            
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;