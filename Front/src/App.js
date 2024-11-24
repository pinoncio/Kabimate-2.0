import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { AuthProvider } from "./Routes/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import UserPageA from "./pages/UserA";
import UserPageU from "./pages/UserU";
import RolPage from "./pages/Rol";
import Insti from "./pages/Insti";
import Cabana from "./pages/Cabana";
import PerfilA from "./pages/PerfilA";
import HomeCabana from "./pages/HomeCabaña";
import HomeC from "./pages/HomeC";
import HomeH from "./pages/HomeH";
import PerfilU from "./pages/PerfilU";
import Pisos from "./pages/Pisos";
import HabitacionPage from "./pages/Habitacion";
import HomeHabitacion from "./pages/HomeHotel";
import ContactPage from "./pages/contactanos";
import Ayuda from "./pages/Ayuda";
import CategoriaPage from "./pages/Categoria";
import ProductoPage from "./pages/Producto";

export default function App() {
  const [selectedView, setSelectedView] = useState("home");

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="wrapper">
          {/* Header y Aside se muestran siempre */}
          <Header setSelectedView={setSelectedView} />
          <Aside selectedView={selectedView} />

          {/* Uso de <main> para envolver el contenido principal */}
          <main className="content-wrapper">
            <Routes>
              {/* Ruta pública */}
              <Route path="/" element={<Login />} />

              {/* Rutas Admin */}
              <Route
                path="/admin"
                element={<PrivateRoute element={<Admin />} requiredRole="1" />}
              />
              <Route
                path="/userA"
                element={
                  <PrivateRoute element={<UserPageA />} requiredRole="1" />
                }
              />
              <Route
                path="/userU"
                element={
                  <PrivateRoute element={<UserPageU />} requiredRole="1" />
                }
              />
              <Route
                path="/rol"
                element={
                  <PrivateRoute element={<RolPage />} requiredRole="1" />
                }
              />
              <Route
                path="/institucion"
                element={<PrivateRoute element={<Insti />} requiredRole="1" />}
              />

              {/* Rutas de Usuarios */}
              <Route
                path="/home"
                element={<PrivateRoute element={<Home />} requiredRole="2" />}
              />
              <Route
                path="/gcabana"
                element={<PrivateRoute element={<Cabana />} requiredRole="2" />}
              />
              <Route
                path="/perfilA/:id"
                element={
                  <PrivateRoute element={<PerfilA />} requiredRole="2" />
                }
              />
              <Route
                path="/perfilU/:id"
                element={
                  <PrivateRoute element={<PerfilU />} requiredRole="2" />
                }
              />
              <Route
                path="/Hcabana"
                element={
                  <PrivateRoute element={<HomeCabana />} requiredRole="2" />
                }
              />
              <Route
                path="/HHotel"
                element={
                  <PrivateRoute element={<HomeHabitacion />} requiredRole="2" />
                }
              />
              <Route
                path="/homeC"
                element={<PrivateRoute element={<HomeC />} requiredRole="2" />}
              />
              <Route
                path="/homeH"
                element={<PrivateRoute element={<HomeH />} requiredRole="2" />}
              />
              <Route
                path="/pisos"
                element={<PrivateRoute element={<Pisos />} requiredRole="2" />}
              />
              <Route
                path="/ghotel"
                element={
                  <PrivateRoute element={<HabitacionPage />} requiredRole="2" />
                }
              />
              <Route
                path="/contactanos"
                element={
                  <PrivateRoute element={<ContactPage />} requiredRole="2" />
                }
              />
              <Route
                path="/ayuda"
                element={<PrivateRoute element={<Ayuda />} requiredRole="2" />}
              />
              <Route
                path="/gCategory"
                element={
                  <PrivateRoute element={<CategoriaPage />} requiredRole="2" />
                }
              />
              <Route
                path="/gProducto"
                element={
                  <PrivateRoute element={<ProductoPage />} requiredRole="2" />
                }
              />

              {/* Ruta para rutas no existentes */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={() => {
                      const token = localStorage.getItem("authToken");
                      const rol = localStorage.getItem("rol");

                      if (token && rol === "1") {
                        return "/admin"; // Si el token y rol son válidos y rol es 1, redirigir a /admin
                      } else if (token) {
                        return "/home"; // Si solo el token es válido, redirigir a /home
                      } else {
                        return "/"; // Si no hay token, redirigir a la página de inicio
                      }
                    }}
                    replace
                  />
                }
              />
            </Routes>
          </main>

          {/* Footer se muestra siempre */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
