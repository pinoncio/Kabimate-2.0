import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);

  const login = (newToken, newRol) => {
    setToken(newToken);
    setRol(newRol);
    sessionStorage.setItem('authToken', newToken);
    sessionStorage.setItem('rol', newRol); // Guardar el rol en sessionStorage
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('rol'); // Limpiar el rol en sessionStorage
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, rol }}>
      {children}
    </AuthContext.Provider>
  );
};
