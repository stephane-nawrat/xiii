// ==========================================
// XIII Frontend - Dashboard Page
// ==========================================
// Dashboard responsive 3 breakpoints

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('stats');
  const [activeUserTab, setActiveUserTab] = useState('photographers');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const userTabs = [
    { id: 'photographers', label: 'Photographers' },
    { id: 'visitors', label: 'Visitors' },
    { id: 'guests', label: 'Guests' }
  ];

  return (
    <div className="min-h-screen bg-cream">
      
      {/* === HEADER === */}
      <header className="fixed top-3 left-0 right-0 pb-0 bg-cream border-b border-gray-100 shadow-sm z-50">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-16 flex items-end justify-between pb-4">
          
          {/* Mobile: Burger + Logo */}
          <div className="flex items-end gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-carbon"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="text-base font-medium text-gray-text">__</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 md:px-10 py-1.5 bg-transparent border-2 border-carbon text-carbon text-sm font-medium rounded-lg hover:bg-carbon hover:text-cream transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* === CONTAINER CENTRÉ === */}
      <div className="max-w-screen-2xl mx-auto pt-[76px]">
        
        {/* === LAYOUT SIDEBAR + CONTENU === */}
        <div className="flex min-h-[calc(100vh-76px)]">
          
          {/* Sidebar */}
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Contenu Principal */}
          <main className="flex-1 px-4 md:px-8 pt-8 md:pt-12 pb-10 overflow-y-auto">
            
            {/* Titre Section */}
            <h2 className="text-xl md:text-2xl font-bold text-carbon mb-8 md:mb-10">
              {activeSection === 'stats' && 'Dashboard Statistics'}
              {activeSection === 'users' && 'Users Management'}
              {activeSection === 'settings' && 'Settings'}
            </h2>

            {/* === SECTION STATS === */}
            {activeSection === 'stats' && (
              <div className="space-y-8 md:space-y-10">
                
                {/* Section 1: Users Stats */}
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-text mb-4 md:mb-5 uppercase tracking-wide">
                    Users
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Total Users</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Photographers</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Visitors</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Guests</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Content Stats */}
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-text mb-4 md:mb-5 uppercase tracking-wide">
                    Content
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Total Photos</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Series</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Selections</p>
                    </div>
                    
                    <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                      <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">--</p>
                      <p className="text-xs md:text-sm text-gray-text">Downloads</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Site Traffic Graph */}
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-text mb-4 md:mb-5 uppercase tracking-wide">
                    Site Traffic
                  </h3>
                  <div className="bg-cream-light p-8 md:p-10 rounded-lg border border-gray-300 h-48 md:h-56 flex items-center justify-center">
                    <p className="text-xs md:text-sm text-gray-text">Graph: Visitors over time (placeholder)</p>
                  </div>
                </div>

              </div>
            )}

            {/* === SECTION USERS (Avec Onglets) === */}
            {activeSection === 'users' && (
              <div>
                {/* Onglets Users - Scroll horizontal mobile */}
                <div className="flex gap-4 md:gap-6 mb-6 md:mb-8 border-b border-gray-300 overflow-x-auto">
                  {userTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveUserTab(tab.id)}
                      className={`
                        pb-3 text-xs md:text-sm font-medium transition-colors border-b-2 whitespace-nowrap
                        ${activeUserTab === tab.id
                          ? 'text-carbon border-carbon'
                          : 'text-gray-text border-transparent hover:text-carbon'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Contenu selon onglet actif */}
                <div className="bg-cream-light p-8 md:p-12 rounded-lg border border-gray-300">
                  <p className="text-sm text-gray-text">
                    {activeUserTab === 'photographers' && 'Photographers list will be here'}
                    {activeUserTab === 'visitors' && 'Visitors list will be here'}
                    {activeUserTab === 'guests' && 'Guests list will be here'}
                  </p>
                </div>
              </div>
            )}

            {/* === SECTION SETTINGS === */}
            {activeSection === 'settings' && (
              <div className="bg-cream-light p-8 md:p-12 rounded-lg border border-gray-300">
                <p className="text-sm text-gray-text">Settings will be here</p>
              </div>
            )}

          </main>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;