import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

// Función para validar el token (si es un JWT)
const isValidToken = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    // Verificar si el token no ha expirado
    const isExpired = decodedToken.exp < Date.now() / 1000;
    return !isExpired;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(null); // Estado para manejar la validez del token
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Verificar la validez del token cuando se actualice
    const valid = isValidToken(token);
    setIsTokenValid(valid);
    setLoading(false); // Cambiar a false después de verificar
  }, [token]);

  // Si aún se está verificando la validez del token
  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o algo de "cargando"
  }

  // Si no hay token o el token es inválido, redirigir
  return isTokenValid ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
