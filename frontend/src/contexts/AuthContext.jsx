// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Clé pour localStorage
const TOKEN_KEY = 'habit_tracker_token';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Au chargement de l'app → on récupère le token du localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Fonction login : stocke le token
  const login = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  // Fonction logout : supprime tout
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  // Valeur exposée au reste de l'app
  const value = {
    token,
    isAuthenticated: !!token,   // true si token existe
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le context facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};