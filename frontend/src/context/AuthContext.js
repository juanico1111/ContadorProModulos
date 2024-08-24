import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  const login = (user) => {
    // Manejar login
    setAuthState({
      user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const logout = () => {
    // Manejar logout
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  useEffect(() => {
    // Simulación de verificación de sesión al cargar la aplicación
    const checkAuth = async () => {
      try {
        // Aquí podrías realizar una llamada a la API para verificar la sesión
        // Por ejemplo: const response = await fetch('/api/checkAuth');
        // const data = await response.json();
        // setAuthState({ user: data.user, isAuthenticated: true, loading: false });

        // Simulación de autenticación
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
