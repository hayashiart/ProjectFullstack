// src/pages/Home.jsx

import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';           // ← Ajoute cette ligne

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />                                           {/* ← Ajoute ici */}

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Habit Tracker</h1>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
          Suivez vos habitudes quotidiennes de manière simple et efficace.
        </p>
        <div className="flex gap-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Créer un compte
          </Link>
        </div>
      </main>
    </div>
  );
}