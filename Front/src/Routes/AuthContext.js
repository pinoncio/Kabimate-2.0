import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const navigate = useNavigate();

  // Verificar la validez del token
  const verifyToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now(); // El token es válido si aún no ha expirado
    } catch (error) {
      return false; // Token inválido
    }
  };

  const handleSessionExpired = () => {
    logout();
    Swal.fire({
      icon: "warning",
      title: "Sesión expirada",
      text: "Tu sesión ha expirado o fue modificada. Por favor, inicia sesión nuevamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      navigate("/");
    });
  };

  const login = (newToken, newRol, newIdUsuario) => {
    setToken(newToken);
    setRol(newRol);
    setIdUsuario(newIdUsuario);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("rol", newRol);
    localStorage.setItem("idUsuario", newIdUsuario);
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    setIdUsuario(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("selectedView");
  };

  // Efecto para inicializar sesión y verificar token
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRol = localStorage.getItem("rol");
    const storedIdUsuario = localStorage.getItem("idUsuario");

    if (storedToken && storedRol && storedIdUsuario) {
      if (verifyToken(storedToken)) {
        setToken(storedToken);
        setRol(storedRol);
        setIdUsuario(storedIdUsuario);
      } else {
        handleSessionExpired();
      }
    }

    // Verifica periódicamente si el token ha expirado
    const interval = setInterval(() => {
      if (token && !verifyToken(token)) {
        handleSessionExpired();
      }
    }, 5000); // Verifica cada 5 segundos

    return () => clearInterval(interval);
  }, [token]);

  // Detectar cambios en el token desde otro lugar (manipulación)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem("authToken");
      if (currentToken !== token || !verifyToken(currentToken)) {
        handleSessionExpired();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout, token, rol, idUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};