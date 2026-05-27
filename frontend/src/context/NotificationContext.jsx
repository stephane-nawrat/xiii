// ==========================================
// XIII Frontend - Notification Context
// ==========================================
// Système de notifications toast pour toute l'application
// Remplace les alert() natifs par des toasts dans le design XIII

// === Imports ===
import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

// === Création du Context ===
const NotificationContext = createContext(null);

// === NotificationProvider ===
export function NotificationProvider({ children }) {

  // === STATE ===
  const [notification, setNotification] = useState(null);

  // === FONCTION : showNotification ===
  // Affiche une notification et la masque après 5 secondes
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  // === FONCTIONS RACCOURCIS ===
  const success = useCallback((message) =>
    showNotification(message, 'success'), [showNotification]);

  const error = useCallback((message) =>
    showNotification(message, 'error'), [showNotification]);

  const info = useCallback((message) =>
    showNotification(message, 'info'), [showNotification]);

  // === STYLES TOAST ===
  const toastStyles = {
    success: 'bg-green-50 text-green-900 border border-green-200',
    error:   'bg-red-50 text-red-900 border border-red-200',
    info:    'bg-cream-light text-carbon border border-gray-300',
  };

  // === RENDU ===
  return (
    <NotificationContext.Provider value={{ success, error, info }}>

      {children}

      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`
            flex items-center gap-3
            px-4 py-3 rounded-lg shadow-lg
            min-w-[280px] max-w-sm
            ${toastStyles[notification.type]}
          `}>
            <span className="text-sm font-medium flex-1">
              {notification.message}
            </span>
            <button
              onClick={() => setNotification(null)}
              className="hover:opacity-70 transition-opacity flex-shrink-0"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

    </NotificationContext.Provider>
  );
}

// === HOOK : useNotification ===
// Usage : const { success, error } = useNotification();
export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  return context;
}