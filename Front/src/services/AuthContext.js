import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

  // Cargar los valores desde sessionStorage al iniciar
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    const storedRol = sessionStorage.getItem('rol');
    const storedIdUsuario = sessionStorage.getItem('idUsuario');
    
    if (storedToken && storedRol && storedIdUsuario) {
      setToken(storedToken);
      setRol(storedRol);
      setIdUsuario(storedIdUsuario);
    }
  }, []);

  const login = (newToken, newRol, newIdUsuario) => {
    setToken(newToken);
    setRol(newRol);
    setIdUsuario(newIdUsuario);
    sessionStorage.setItem('authToken', newToken);
    sessionStorage.setItem('rol', newRol);
    sessionStorage.setItem('idUsuario', newIdUsuario); 
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    setIdUsuario(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('idUsuario');
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, rol, idUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
