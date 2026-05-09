// ==========================================
// XIII Frontend - App Component
// ==========================================
// Configuration routing de l'application

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ApiTest from './tests/ApiHealthTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />
        
        {/* Page de test API */}
        <Route path="/test" element={<ApiTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;