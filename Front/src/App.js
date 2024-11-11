import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserPageA from './pages/UserA';
import UserPageU from './pages/UserU';
import RolPage from './pages/Rol';
import Insti from './pages/Insti';
import Cabana from './pages/Cabana';
import { AuthProvider } from './services/AuthContext'; 
import PerfilA from './pages/PerfilA';
import HomeCabana from './pages/HomeCabaña';

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
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/userA" element={<UserPageA />} />
              <Route path='/userU' element={<UserPageU />} />
              <Route path="/rol" element={<RolPage />} />
              <Route path="/institucion" element={<Insti />} />
              <Route path="/gcabana" element={<Cabana />} />
              <Route path="/perfil/:id" element={<PerfilA/>} />
              <Route path='/Hcabana' element={<HomeCabana/>} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
