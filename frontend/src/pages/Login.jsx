// ==========================================
// XIII Frontend - Login Page
// ==========================================
// Page de connexion avec formulaire

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // États du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gestion soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Appel login via AuthContext
    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      // Redirection vers dashboard
      navigate('/dashboard');
    } else {
      // Affichage erreur
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-8 pb-44">
      {/* Back to Home - fixe en bas à gauche */}
<div className="fixed bottom-8 left-8">
  <button
    onClick={() => navigate('/')}
    className="text-sm text-gray-text hover:text-carbon transition-colors cursor-pointer"
  >
    ← Back to Home
  </button>
</div>


      <div className="w-full max-w-md">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-8xl font-bold text-carbon mb-2">
            XIII
          </h1>
          <p className="text-gray-text">
            ________________
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@xiii.local"
            required
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

 
  {/* Bouton submit */}
  <Button
    type="submit"
    variant="primary"
    loading={loading}
    className="w-full"
  >
    Login
  </Button>

   {/* Espace réservé message - TOUJOURS à la même place */}
  <div className="min-h-[52px]">
    {error && (
      <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    )}
  </div>
</form>



      </div>
    </div>
  );
}

export default Login;