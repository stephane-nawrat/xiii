// ==========================================
// XIII Frontend - Dashboard Page
// ==========================================
// Dashboard avec stats users réelles depuis API

// === IMPORTS ===
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // axios configuré (auth automatique)
import Sidebar from '../components/layout/Sidebar';
import UsersTable from '../components/admin/UsersTable';

function Dashboard() {
  // === CONTEXT AUTH ===
  const { user, logout } = useAuth();

  // === STATES NAVIGATION ===
  const [activeSection, setActiveSection] = useState('stats');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // === STATES STATS API ===
  // stats: objet contenant données backend { totalUsers: 4, photographers: 1, ... }
  const [stats, setStats] = useState(null);
  
  // loading: true pendant appel API, false après
  const [loading, setLoading] = useState(true);
  
  // error: message erreur si API fail, null sinon
  const [error, setError] = useState(null);

  // === FUNCTION: FETCH STATS ===
  // Fonction extraite pour être réutilisable
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard');
      setStats(response.data.stats);
      setError(null);
    } catch (err) {
      console.error('Erreur fetch stats:', err);
      setError('Impossible de charger les statistiques');
    } finally {
      setLoading(false);
    }
  };

  // === EFFECT: FETCH STATS AU MONTAGE ===
  useEffect(() => {
    fetchStats();
  }, []);

  // === HANDLERS ===
  const handleLogout = () => {
    logout();
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

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
              <div>
                
                {/* === ÉTAT LOADING === */}
                {/* Affiché pendant appel API (loading = true) */}
                {loading && (
                  <div className="text-center py-12">
                    <p className="text-gray-text">Loading statistics...</p>
                  </div>
                )}

                {/* === ÉTAT ERROR === */}
                {/* Affiché si API fail (error != null) */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* === ÉTAT SUCCESS === */}
                {/* Affiché quand: pas loading ET pas error ET stats existe */}
                {!loading && !error && stats && (
                  <div>
                    {/* Section Users Stats */}
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-gray-text mb-4 md:mb-5 uppercase tracking-wide">
                        Users
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        
                        {/* Card Total Users */}
                        <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                          {/* {stats.totalUsers} = affiche valeur depuis API (ex: 4) */}
                          <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">
                            {stats.totalUsers}
                          </p>
                          <p className="text-xs md:text-sm text-gray-text">Total Users</p>
                        </div>
                        
                        {/* Card Photographers */}
                        <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                          {/* {stats.photographers} = valeur API (ex: 1) */}
                          <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">
                            {stats.photographers}
                          </p>
                          <p className="text-xs md:text-sm text-gray-text">Photographers</p>
                        </div>
                        
                        {/* Card Visitors */}
                        <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                          {/* {stats.visitors} = valeur API (ex: 2) */}
                          <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">
                            {stats.visitors}
                          </p>
                          <p className="text-xs md:text-sm text-gray-text">Visitors</p>
                        </div>
                        
                        {/* Card Guests */}
                        <div className="bg-cream-light p-6 md:p-7 rounded-lg border border-gray-300">
                          {/* {stats.guests} = valeur API (ex: 1) */}
                          <p className="text-2xl md:text-3xl font-bold text-carbon mb-2">
                            {stats.guests}
                          </p>
                          <p className="text-xs md:text-sm text-gray-text">Guests</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* === SECTION USERS === */}
            {activeSection === 'users' && (
            <UsersTable onUserChange={fetchStats} />
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