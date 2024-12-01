import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Login from "./pages/LoginPage";
import { AuthProvider } from "./Routes/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./pages/HomePage";
import Admin from "./pages/AdminPage";
import UserPageA from "./pages/UserAdminPage";
import UserPageU from "./pages/UserUsuariosPage";
import RolPage from "./pages/RolPage";
import Insti from "./pages/InstitucionPage";
import Cabana from "./pages/CabanaPage";
import PerfilA from "./pages/PerfilAdminPage";
import HomeCabana from "./pages/HomeCabañasPage";
import HomeC from "./pages/HomeCabanaPage";
import HomeH from "./pages/HomeHabitacionesPage";
import PerfilU from "./pages/PerfilUsuariosPage";
import Pisos from "./pages/PisosPage";
import HabitacionPage from "./pages/HabitacionPage";
import HomeHabitacion from "./pages/HomeHotelPage";
import ContactPage from "./pages/ContanctoPage";
import Ayuda from "./pages/AyudaPage";
import CategoriaPage from "./pages/CategoriaPage";
import ProductoPage from "./pages/ProductoPage";
import ReservaCabanaForm from "./pages/CreservaPage";
import ListaCabanaReservas from "./pages/ListaReservasCabanaPage";
import ReservaCabanaPage from "./pages/ReservaCabanaPage";
import ReservaHabitacionForm from "./pages/HreservaPage";
import ListaHabitacionReservas from "./pages/ListaReservasHabitacionPage";
import ReservaHabitacionPage from "./pages/ReservaHabitacionPage";
import PasarelaPago from "./pages/PagoPage";


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
              <Route
                path="/reservaC/:id_cabania"
                element={
                  <PrivateRoute element={<ReservaCabanaForm />} requiredRole="2" />
                }
              />
              <Route
                path="/reservasC"
                element={
                  <PrivateRoute element={<ListaCabanaReservas />} requiredRole="2" />
                }
              />
              <Route
                path="/Creserva/:id_reserva"
                element={
                  <PrivateRoute element={<ReservaCabanaPage />} requiredRole="2" />
                }
              />
              <Route
              path="/reservaH/:id_habitacion"
              element={
                <PrivateRoute element={<ReservaHabitacionForm/>} requiredRole="2" />
              }
              />
              <Route
                path="/reservasH"
                element={
                  <PrivateRoute element={<ListaHabitacionReservas />} requiredRole="2" />
                }
              />
              <Route
                path="/Hreserva/:id_reserva"
                element={
                  <PrivateRoute element={<ReservaHabitacionPage />} requiredRole="2" />
                }
              />
              <Route
                path="/Pago/:id_reserva"
                element={
                  <PrivateRoute element={<PasarelaPago />} requiredRole="2" />
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
