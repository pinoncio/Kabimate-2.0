import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

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
