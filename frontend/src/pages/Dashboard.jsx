// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/my-habits', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setHabits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchHabits();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Mes habitudes
            </h1>
            <Link
              to="/habits/new"  // On créera cette page juste après
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              + Nouvelle habitude
            </Link>
          </div>

          {loading && <p className="text-center text-gray-600">Chargement de tes habitudes...</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 py-12">
                  Tu n'as pas encore d'habitudes. Crée-en une !
                </p>
              ) : (
                habits.map(habit => (
                  <div key={habit.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{habit.name}</h3>
                    {habit.description && (
                      <p className="text-gray-600 mb-4">{habit.description}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Créée le {new Date(habit.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-12 flex justify-center gap-6">
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
      </main>
    </div>
  );
}