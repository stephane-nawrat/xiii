// ==========================================
// XIII Frontend - Footer Component
// ==========================================
// Footer minimaliste aligné avec le header

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-cream border-t border-gray-200 shadow-sm z-50">
      <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-end">
        {/* Lien Dev Tools - aligné à droite comme Login */}
        <Link
          to="/test"
          className="text-sm text-gray-text hover:text-carbon transition-colors font-medium"
        >
          Dev Tools →
        </Link>
      </div>
    </footer>
  );
}

export default Footer;