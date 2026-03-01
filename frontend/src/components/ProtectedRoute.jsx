// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Pendant le chargement initial → on affiche rien (ou un spinner plus tard)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  // Si pas authentifié → redirection vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si OK → affiche la page protégée (Outlet = l'enfant de la route)
  return <Outlet />;
}