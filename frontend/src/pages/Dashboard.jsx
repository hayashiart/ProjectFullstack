// src/pages/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Le Header est déjà présent via la structure parent, mais on peut en rajouter un si besoin */}

      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Tableau de bord
          </h1>

          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="text-lg text-gray-600 mb-6">
              Bienvenue ! Tu es connecté (token présent).
            </p>

            <p className="text-sm text-gray-500 mb-8 break-all">
              Token actuel : {token}
            </p>

            <div className="flex gap-6">
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Se déconnecter
              </button>

              <Link
                to="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}