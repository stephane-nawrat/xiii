// ==========================================
// XIII Frontend - Dashboard Page
// ==========================================
// Page dashboard admin (temporaire)

import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Pas besoin de navigate, AuthContext gère la redirection
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header temporaire */}
      <div className="border-b border-gray-300 bg-cream">
        <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-carbon">
            XIII Dashboard
          </h1>
          
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-transparent border-2 border-carbon text-carbon text-sm font-medium rounded-lg hover:bg-carbon hover:text-cream transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="text-center">
          {/* Titre */}
          <h2 className="text-4xl font-bold text-carbon mb-4">
            Welcome to XIII Admin
          </h2>
          
          {/* Info user */}
          <p className="text-xl text-gray-text mb-8">
            Logged in as: {user?.email}
          </p>

          {/* Placeholder stats */}
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-cream-light p-8 rounded-lg border-2 border-gray-300">
              <p className="text-4xl font-bold text-carbon mb-2">--</p>
              <p className="text-gray-text">Total Users</p>
            </div>
            
            <div className="bg-cream-light p-8 rounded-lg border-2 border-gray-300">
              <p className="text-4xl font-bold text-carbon mb-2">--</p>
              <p className="text-gray-text">Total Photos</p>
            </div>
            
            <div className="bg-cream-light p-8 rounded-lg border-2 border-gray-300">
              <p className="text-4xl font-bold text-carbon mb-2">--</p>
              <p className="text-gray-text">Active Projects</p>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-text mt-12">
            Dashboard placeholder - Stats will be loaded in Session 7
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;