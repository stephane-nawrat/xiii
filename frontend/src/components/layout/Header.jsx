// ==========================================
// XIII Frontend - Header Component
// ==========================================
// Header minimaliste inspiré Runway AI Festival

import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-3 left-0 right-0 pb-0 bg-cream border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-end justify-between pb-4">
        {/* Logo XIII - aligné sur la baseline */}
        <Link to="/" className="text-base font-medium text-gray-text">
          __
        </Link>

        {/* Bouton Login - aligné baseline avec les autres boutons */}
        <Link 
  to="/login"
  className="px-10 py-1.5 bg-transparent border-2 border-carbon text-carbon text-sm font-medium rounded-lg hover:bg-carbon hover:text-cream transition-all duration-200"
>
  Login
</Link>
      </div>
    </header>
  );
}

export default Header;