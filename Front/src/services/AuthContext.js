import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRol = localStorage.getItem('rol');
    const storedIdUsuario = localStorage.getItem('idUsuario');
    
    if (storedToken && storedRol && storedIdUsuario) {
      setToken(storedToken);
      setRol(storedRol);
      setIdUsuario(storedIdUsuario);
    } else {
      console.log("No se encontraron valores en localStorage");
    }
  }, []);
  

  const login = (newToken, newRol, newIdUsuario) => {
    setToken(newToken);
    setRol(newRol);
    setIdUsuario(newIdUsuario);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('rol', newRol);
    localStorage.setItem('idUsuario', newIdUsuario); 
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    setIdUsuario(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, rol, idUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};