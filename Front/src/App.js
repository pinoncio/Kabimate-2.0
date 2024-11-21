import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthProvider } from './Routes/AuthContext';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './pages/Home'; 
import Admin from './pages/Admin';
import UserPageA from './pages/UserA';
import UserPageU from './pages/UserU';
import RolPage from './pages/Rol';
import Insti from './pages/Insti';
import Cabana from './pages/Cabana';
import PerfilA from './pages/PerfilA';
import HomeCabana from './pages/HomeCabaña';
import HomeC from './pages/HomeC';
import HomeH from './pages/HomeH';
import PerfilU from './pages/PerfilU';
import Pisos from './pages/Pisos';
import HabitacionPage from './pages/Habitacion';
import HomeHabitacion from './pages/HomeHotel';
import ContactPage from './pages/contactanos';
import Ayuda from './pages/Ayuda';
import CategoriaPage from './pages/Categoria';
import ProductoPage from './pages/Producto';

export default function App() {
  const [selectedView, setSelectedView] = useState("home");

  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <Header setSelectedView={setSelectedView} />
          <Aside selectedView={selectedView} />
          <div className="content-wrapper">
            <Routes>
              {/* Ruta pública */}
              <Route path="/" element={<Login />} />

              {/* Rutas protegidas */}
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
              <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
              <Route path="/userA" element={<PrivateRoute element={<UserPageA />} />} />
              <Route path="/userU" element={<PrivateRoute element={<UserPageU />} />} />
              <Route path="/rol" element={<PrivateRoute element={<RolPage />} />} />
              <Route path="/institucion" element={<PrivateRoute element={<Insti />} />} />
              <Route path="/gcabana" element={<PrivateRoute element={<Cabana />} />} />
              <Route path="/perfilA/:id" element={<PrivateRoute element={<PerfilA />} />} />
              <Route path="/perfilU/:id" element={<PrivateRoute element={<PerfilU />} />} />
              <Route path="/Hcabana" element={<PrivateRoute element={<HomeCabana />} />} />
              <Route path="/HHotel" element={<PrivateRoute element={<HomeHabitacion />} />} />
              <Route path="/homeC" element={<PrivateRoute element={<HomeC />} />} />
              <Route path="/homeH" element={<PrivateRoute element={<HomeH />} />} />
              <Route path="/pisos" element={<PrivateRoute element={<Pisos />} />} />
              <Route path="/ghotel" element={<PrivateRoute element={<HabitacionPage />} />} />
              <Route path="/contactanos" element={<PrivateRoute element={<ContactPage />} />} />
              <Route path="/ayuda" element={<PrivateRoute element={<Ayuda />} />} />
              <Route path="/gCategory" element={<PrivateRoute element={<CategoriaPage />} />} />
              <Route path="/gProducto" element={<PrivateRoute element={<ProductoPage />} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
