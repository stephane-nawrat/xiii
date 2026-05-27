// ==========================================
// XIII Frontend - App Component
// ==========================================
// Point d'entrée React — routing et providers

// === Imports Router ===
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// === Imports Pages ===
import Home      from './pages/Home';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';

// === Imports Components ===
import ProtectedRoute from './components/auth/ProtectedRoute';

// === Imports Tests ===
import ApiHealthTest from './tests/ApiHealthTest';
import ApiLoginTest  from './tests/ApiLoginTest';
import SpinnerTest   from './tests/SpinnerTest';

// === Imports Providers ===
// NotificationProvider : système de notifications toast
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider }         from './context/AuthContext';

function App() {
  return (
    // AuthProvider : gestion globale authentification (JWT, user, login, logout)
    // Doit envelopper NotificationProvider et BrowserRouter
    // → disponible dans toutes les pages et composants
    <AuthProvider>
      
      {/* NotificationProvider : système de notifications toast */}
      {/* Enveloppe le routing → disponible dans toutes les pages */}
      <NotificationProvider>
        <BrowserRouter>
          <Routes>

            {/* Routes publiques */}
            <Route path="/"      element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Route protégée - Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Routes de test */}
            <Route path="/test"         element={<ApiHealthTest />} />
            <Route path="/test/login"   element={<ApiLoginTest />} />
            <Route path="/test/spinner" element={<SpinnerTest />} />

          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;