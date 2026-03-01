// src/pages/Login.jsx
import { Link } from 'react-router-dom';          // ← on va le remettre pour le lien
import Header from '../components/layout/Header';

export default function Login() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Connexion</h2>
          <p className="text-gray-600 mb-6 text-center">
            (Formulaire à venir – pour l'instant page placeholder)
          </p>
          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}