// ==========================================
// XIII Frontend - API Health Test
// ==========================================
// Test connexion Backend (GET /api/health)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ApiHealthTest() {
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        const response = await api.get('/health');
        
        console.log('API Response:', response.data);
        setApiData(response.data);
        setApiStatus('Backend Connected');
      } catch (err) {
        console.error('API Error:', err);
        setApiStatus('❌ Backend Error');
        setError(err.message);
      }
    };

    testAPI();
  }, []);

  return (
  <div className="min-h-screen bg-cream p-8">
    {/* Lien retour (fixe en bas à gauche) */}
    <div className="fixed bottom-8 left-8">
      <Link 
        to="/"
        className="text-sm text-gray-text hover:text-carbon transition-colors"
      >
        ← Back
      </Link>
    </div>

    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="text-4xl font-bold text-carbon mb-8">
        API Connection Test
      </h1>

        {/* Status */}
        <div className="bg-cream-light p-6 rounded-lg mb-4">
          <p className="text-2xl font-semibold text-carbon">
            Status: {apiStatus}
          </p>
        </div>

        {/* Response Data */}
        {apiData && (
          <div className="bg-cream-light p-6 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-carbon mb-4">
              Response Data:
            </h2>
            <pre className="text-sm text-carbon overflow-auto">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 p-6 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Error:
            </h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Configuration */}
        <div className="bg-cream-light p-6 rounded-lg">
          <h2 className="text-xl font-bold text-carbon mb-4">
            Configuration:
          </h2>
          <ul className="space-y-2 text-carbon">
            <li>• Frontend: http://localhost:5173</li>
            <li>• Backend: http://localhost:3001</li>
            <li>• Endpoint: GET /api/health</li>
            <li>• Service: src/services/api.js</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApiHealthTest;