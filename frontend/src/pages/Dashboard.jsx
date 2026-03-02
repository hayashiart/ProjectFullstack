import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Fonction fetchHabits accessible partout
  const fetchHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/my-habits', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur ${response.status}: ${errText}`);
      }

      const data = await response.json();
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage + quand token change
  useEffect(() => {
    if (token) fetchHabits();
  }, [token]);

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/habits/${id}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: 'Réponse invalide du serveur' };
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Erreur ${res.status}`);
      }

      setSuccessMsg('Journée marquée !');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchHabits();
    } catch (err) {
      setError('Erreur : ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette habitude ?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/habits/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: 'Réponse invalide du serveur' };
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Erreur ${res.status}`);
      }

      setSuccessMsg('Habitude supprimée');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchHabits();
    } catch (err) {
      setError('Erreur : ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Mes habitudes
            </h1>
            <Link
              to="/habits/new"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              + Nouvelle habitude
            </Link>
          </div>

          {/* Messages de succès */}
          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
              {successMsg}
            </div>
          )}

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
                    
                    <p className="text-sm text-gray-500 mb-4">
                      Créée le {new Date(habit.createdAt).toLocaleDateString('fr-FR')}
                    </p>

                    {/* Boutons d'actions */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleComplete(habit.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded transition-colors"
                      >
                        Aujourd’hui fait
                      </button>

                      <button
                        onClick={() => handleDelete(habit.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
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