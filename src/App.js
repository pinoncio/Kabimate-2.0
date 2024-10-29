import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import RolPage from './pages/rol';
import Insti from './pages/Insti';
import { AuthProvider } from './services/AuthContext'; // Importar el AuthProvider

export default function App() {
  return (
    <AuthProvider> {/* Envuelve la aplicación con AuthProvider */}
      <Router>
        <div className="wrapper">
          {/* Mantén el layout de AdminLTE */}
          <Header />
          <Aside />
          
          {/* Content Wrapper */}
          <div className="content-wrapper">
            <Routes>
              {/* Rutas de la aplicación */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/rol" element={<RolPage />} />
              <Route path='/institucion' element={<Insti />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
