import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center relative">
      {/* Contenu centré */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-carbon mb-4">
          XIII
        </h1>
        <p className="text-xl text-gray-text">
          Admin Dashboard
        </p>
      </div>

      {/* Lien Dev Tools (fixed, en dehors du centrage) */}
      <div className="fixed bottom-8 right-8">
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