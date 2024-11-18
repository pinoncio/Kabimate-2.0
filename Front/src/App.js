import React, { useState } from 'react';
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
import HomeC from './pages/HomeC';
import HomeH from './pages/HomeH';
import PerfilU from './pages/PerfilU';
import Pisos from './pages/Pisos';
import HabitacionPage from './pages/Habitacion';

export default function App() {
  // Estado para manejar la vista seleccionada entre "hoteles" y "cabañas"
  const [selectedView, setSelectedView] = useState("home");

  return (
    <AuthProvider> {/* Envuelve la aplicación con AuthProvider */}
      <Router>
        <div className="wrapper">
          {/* Mantén el layout de AdminLTE */}
          <Header setSelectedView={setSelectedView} /> {/* Pasamos setSelectedView a Header */}
          <Aside selectedView={selectedView} /> {/* Pasamos selectedView a Aside */}
          
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
              <Route path="/perfilA/:id" element={<PerfilA/>} />
              <Route path="/perfilU/:id" element={<PerfilU/>} />
              <Route path='/Hcabana' element={<HomeCabana/>} />
              <Route path='/homeC' element={<HomeC />} />
              <Route path='/homeH' element={<HomeH />} />
              <Route path='/pisos' element={<Pisos />} />
              <Route path='/ghotel' element={<HabitacionPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
