import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRol = localStorage.getItem("rol");
    const storedIdUsuario = localStorage.getItem("idUsuario");

    if (storedToken && storedRol && storedIdUsuario) {
      const decodedToken = jwtDecode(storedToken);

      // Verificar si el token ha expirado
      if (decodedToken.exp * 1000 > Date.now()) {
        setToken(storedToken);
        setRol(storedRol);
        setIdUsuario(storedIdUsuario);
      } else {
        logout();
      }
    }
  }, []); // Este useEffect solo se ejecuta una vez, al cargar el componente

  // Lógica de login
  const login = (newToken, newRol, newIdUsuario) => {
    setToken(newToken);
    setRol(newRol);
    setIdUsuario(newIdUsuario);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("rol", newRol);
    localStorage.setItem("idUsuario", newIdUsuario);
  };

  // Lógica de logout
  const logout = () => {
    setToken(null);
    setRol(null);
    setIdUsuario(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("idUsuario");
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, rol, idUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
