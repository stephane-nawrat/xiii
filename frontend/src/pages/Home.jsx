import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // ← AJOUTER

function Home() {
  const { user, isAuthenticated } = useAuth();  // ← AJOUTER

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center relative">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-carbon mb-4">
          XIII
        </h1>
        <p className="text-xl text-gray-text mb-4">
          Admin Dashboard
        </p>
        
        {/* Test Auth Context */}
        <p className="text-sm text-gray-text">
          Auth: {isAuthenticated ? `✅ ${user.email}` : '❌ Not logged in'}
        </p>
      </div>

      <div className="fixed bottom-4 right-4">
        <Link 
          to="/test"
          className="text-sm text-gray-text hover:text-carbon transition-colors"
        >
          Dev Tools →
        </Link>
      </div>
    </div>
  );
}

export default Home;