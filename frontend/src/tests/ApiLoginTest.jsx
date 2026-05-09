// ==========================================
// XIII Frontend - Auth Login Test
// ==========================================
// Test du flow d'authentification complet

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ApiLoginTest() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('admin@xiii.local');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Test Login
  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    
    const result = await login(email, password);
    
    setLoading(false);
    
    if (result.success) {
      setMessage('✅ Login successful!');
    } else {
      setMessage(`❌ Error: ${result.error}`);
    }
  };

  // Test Logout
  const handleLogout = () => {
    logout();
    setMessage('✅ Logged out');
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      {/* Lien retour */}
      <div className="fixed bottom-8 left-8">
        <Link 
          to="/"
          className="text-sm text-gray-text hover:text-carbon transition-colors"
        >
          ← Back to HomePage
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-carbon mb-8">
          Authentication Test
        </h1>

        {/* Auth Status */}
        <div className="bg-cream-light p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-carbon mb-4">
            Current Status:
          </h2>
          <p className="text-carbon mb-2">
            Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}
          </p>
          {user && (
            <div className="mt-4 p-4 bg-cream rounded">
              <p className="text-sm text-gray-text mb-1">User ID: {user.user_id}</p>
              <p className="text-sm text-gray-text mb-1">Email: {user.email}</p>
              <p className="text-sm text-gray-text">Role ID: {user.role_id}</p>
            </div>
          )}
        </div>

        {/* Login Form */}
        {!isAuthenticated ? (
          <div className="bg-cream-light p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold text-carbon mb-4">
              Test Login:
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-carbon mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-cream border border-gray-300 rounded text-carbon"
                  placeholder="admin@xiii.local"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-carbon mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-cream border border-gray-300 rounded text-carbon"
                  placeholder="admin123"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full px-6 py-3 bg-carbon-button text-cream rounded hover:bg-carbon transition-colors disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Login'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-cream-light p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold text-carbon mb-4">
              Test Logout:
            </h2>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-carbon-button text-cream rounded hover:bg-carbon transition-colors"
            >
              Test Logout
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="bg-cream-light p-4 rounded-lg mb-6">
            <p className="text-carbon">{message}</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-cream-light p-6 rounded-lg">
          <h2 className="text-xl font-bold text-carbon mb-4">
            Test Info:
          </h2>
          <ul className="space-y-2 text-carbon text-sm">
            <li>• Default credentials: admin@xiii.local / admin123</li>
            <li>• Test flow: Login → Check user state → Logout</li>
            <li>• Service: src/services/authService.js</li>
            <li>• Context: src/context/AuthContext.jsx</li>
            <li>• Endpoint: POST /api/auth/login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApiLoginTest;