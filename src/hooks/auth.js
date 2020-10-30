import React, { createContext, useContext, useState, useCallback } from 'react';
import { isAuthed, login as authLogin, logout as authLogout } from '../services/auths';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (isAuthed()) return { authed: true };
    return {};
  });
  const login = useCallback((syslogado) => {
    authLogin(syslogado);
    setData({ authed: true });
  }, [])
  const logout = useCallback(() => {
    authLogout();
    setData({ authed: false });
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ authed: data.authed || false, login, logout }} >
      {children}
    </AuthContext.Provider >
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');

  return context;
}
