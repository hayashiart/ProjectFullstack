// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Habit Tracker
        </Link>

        <nav className="flex gap-6">
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}