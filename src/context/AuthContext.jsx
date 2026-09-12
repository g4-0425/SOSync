import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('sosync_auth_user', null);

  const login = (badgeId, passCode) => {
    // Frontend-only officer authentication simulation
    const mockUser = {
      id: badgeId || 'OFFICER-101',
      name: 'Duty Dispatcher',
      role: 'Admin Officer',
      token: 'LOCAL-JWT-SESSION-SECURE-2026',
      loginTime: new Date().toLocaleTimeString()
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
