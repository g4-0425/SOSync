import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('sosync_auth_user', null);
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('sosync_registered_users', []);

  const demoAccounts = [
    { email: 'dispatcher@example.com', password: 'dispatch123', role: 'Dispatcher', name: 'Demo Dispatcher' },
    { email: 'ambulance@example.com', password: 'ambulance123', role: 'Ambulance', name: 'Demo Ambulance' },
    { email: 'hospital@example.com', password: 'hospital123', role: 'HospitalStaff', name: 'Demo Hospital Staff' },
    { email: 'police@example.com', password: 'police123', role: 'Police', name: 'Demo Police Officer' },
    { email: 'admin@example.com', password: 'admin123', role: 'Administrator', name: 'Demo Admin' },
    { badgeId: 'OFFICER-101', password: 'sosync2026', role: 'Admin Officer', name: 'Duty Dispatcher' },
  ];

  const register = (newUser) => {
    if (registeredUsers.find(u => u.email === newUser.email)) {
      return { success: false, message: 'Email already registered' };
    }
    setRegisteredUsers([...registeredUsers, newUser]);
    return { success: true };
  };

  const login = (identifier, password) => {
    const demo = demoAccounts.find(acc =>
      (acc.email && acc.email === identifier) ||
      (acc.badgeId && acc.badgeId === identifier)
    );
    if (demo && demo.password === password) {
      const mockUser = {
        id: identifier,
        name: demo.name,
        role: demo.role,
        token: 'LOCAL-JWT-SESSION-SECURE-2026',
        loginTime: new Date().toLocaleTimeString(),
      };
      setUser(mockUser);
      return { success: true, user: mockUser };
    }

    const citizen = registeredUsers.find(u => u.email === identifier && u.password === password);
    if (citizen) {
      const loggedInUser = {
        id: citizen.email,
        name: citizen.name,
        role: 'Citizen',
        token: 'LOCAL-JWT-SESSION-SECURE-2026',
        loginTime: new Date().toLocaleTimeString(),
      };
      setUser(loggedInUser);
      return { success: true, user: loggedInUser };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
