// ==========================================
// XIII Frontend - Sidebar Component
// ==========================================
// Sidebar responsive avec toggle mobile

import { useAuth } from '../../context/AuthContext';

function Sidebar({ activeSection, onSectionChange, isOpen, onClose }) {
  const { user } = useAuth();

  const menuItems = [
    { id: 'stats', label: 'Stats' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' },
    { id: 'devtools', label: 'Dev Tools', external: true }
  ];

  const handleMenuClick = (itemId) => {
    onSectionChange(itemId);
    // Fermer sidebar mobile après click
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay Mobile (si sidebar ouverte) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-carbon/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-cream border-r border-gray-300
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header Sidebar */}
        <div className="px-6 pt-12 pb-6">
          <h2 className="text-2xl font-bold text-carbon mb-2">Dashboard</h2>
          <p className="text-xs text-gray-text">Logged in as:</p>
          <p className="text-sm text-carbon font-medium">{user?.email}</p>
        </div>

        {/* Menu Navigation */}
        <nav className="px-6 pt-6">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.id}>
                
                {item.external ? (
                  
                    <a href="/test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-gray-text hover:text-carbon transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      w-full flex items-center justify-between
                      text-sm font-medium transition-colors
                      ${activeSection === item.id 
                        ? 'text-carbon' 
                        : 'text-gray-text hover:text-carbon'
                      }
                    `}
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

      </aside>
    </>
  );
}

export default Sidebar;