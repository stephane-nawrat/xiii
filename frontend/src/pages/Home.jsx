// ==========================================
// XIII Frontend - Home Page
// ==========================================
// Page d'accueil simple

import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Body centré */}
      <div className="min-h-screen bg-cream flex items-center justify-center pt-16">
        <div className="text-center">
          {/* XIII titre principal */}
          <h1 className="text-8xl font-bold text-carbon mb-2 tracking-tight">
            XIII
          </h1>
          
          {/* Sous-titre */}
          <p className="text-xl text-gray-text pb-36 ">
            ____________
          </p>
        </div>
      </div>

      {/* Lien Dev Tools */}
    {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;