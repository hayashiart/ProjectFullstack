// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import HabitNew from './pages/HabitNew';
import HabitEdit from './pages/HabitEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/habits/new" element={<HabitNew />} />
        <Route path="/habits/:id/edit" element={<HabitEdit />} />
        
        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Plus tard tu pourras ajouter d'autres routes ici */}
        </Route>

        {/* Pour les URLs inconnues → on redirige vers Home pour l'instant */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;