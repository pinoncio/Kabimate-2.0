import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Sin llaves porque no se exporta por defecto

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar carga
  const navigate = useNavigate();

  const verifyToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now(); // Token válido si no ha expirado
    } catch {
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
    setRol(newRol);           // Guardar el rol en el estado del contexto
    setIdUsuario(newIdUsuario);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("rol", newRol);  // Guardar el rol en localStorage
    localStorage.setItem("idUsuario", newIdUsuario);
  };
  

  const logout = () => {
    setToken(null);
    setRol(null);
    setIdUsuario(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("selectedView")
  };

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
    setLoading(false); // Indicar que terminó la inicialización
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && !verifyToken(token)) {
        handleSessionExpired();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

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
    <AuthContext.Provider value={{ login, logout, token, rol, idUsuario, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
