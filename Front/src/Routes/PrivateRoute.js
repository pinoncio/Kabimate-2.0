import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

// Verificar validez del token
const isValidToken = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const PrivateRoute = ({ element, requiredRole }) => {
  const { token, loading, rol } = useContext(AuthContext);

  // Mientras el contexto está cargando, mostramos un indicador de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si el token no es válido o el rol no coincide con el requerido, redirigir a la página de login
  if (!token || !isValidToken(token)) {
    return <Navigate to="/" replace />;
  }

  // Convertir rol y requiredRole a números y compararlos
  if (parseInt(rol, 10) === 1 && requiredRole === "2") {
    // Si es admin (rol "1") y está intentando acceder a una ruta de usuario (rol "2"), redirigir al /admin
    return <Navigate to="/admin" replace />;
  }

  if (requiredRole && parseInt(rol, 10) !== parseInt(requiredRole, 10)) {
    return <Navigate to="/home" replace />;
  }

  // Si todo es válido, renderizamos la ruta solicitada
  return element;
};

export default PrivateRoute;
