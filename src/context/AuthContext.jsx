import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import useStore from '../store';

// Auth context provides authentication state and actions.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Zustand store for auth state.
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));

  // Local storage for registered demo citizens (non‑demo accounts).
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('sosync_registered_users', []);

  // Hard‑coded demo accounts for quick login.
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
      // Normalize role names for routing/authorization
      let normalizedRole = demo.role;
      if (['Admin Officer', 'Officer', 'AdminOfficer'].includes(demo.role)) {
        normalizedRole = 'admin';
      } else if (['Dispatcher', 'dispatcher'].includes(demo.role)) {
        normalizedRole = 'dispatcher';
      } else if (['Police', 'police'].includes(demo.role)) {
        normalizedRole = 'police';
      } else if (['HospitalStaff', 'hospital'].includes(demo.role)) {
        normalizedRole = 'hospital';
      } else if (['Ambulance', 'responder'].includes(demo.role)) {
        normalizedRole = 'responder';
      }
      // Use store login, passing the normalized role.
      return storeLogin(identifier, password, normalizedRole);
    }
    const citizen = registeredUsers.find(u => u.email === identifier && u.password === password);
    if (citizen) {
      // Citizen role handled inside store as default 'Citizen'.
      return storeLogin(identifier, password, 'citizen');
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    storeLogout();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
