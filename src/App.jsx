import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { EmergencyProvider } from './context/EmergencyContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import CommandCenterPage from './pages/CommandCenterPage';
import EmergencyReportPage from './pages/EmergencyReportPage';
import EmergencyDetailPage from './pages/EmergencyDetailPage';
import DashboardPage from './pages/DashboardPage';
import HospitalsPage from './pages/HospitalsPage';
import AmbulancesPage from './pages/AmbulancesPage';
import PolicePage from './pages/PolicePage';
import FirePage from './pages/FirePage';
import HistoryPage from './pages/HistoryPage';
import ReportsPage from './pages/ReportsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AccessDeniedPage from './pages/AccessDeniedPage';


export default function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <EmergencyProvider>
          <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar onOpenLogin={() => setLoginModalOpen(true)} />
              
              <main style={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/command-center" element={<CommandCenterPage />} />
                  <Route path="/emergency" element={<EmergencyReportPage />} />
                  <Route path="/emergency/:id" element={<EmergencyDetailPage />} />
                  
                  {/* Protected Routes with role restrictions */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={['citizen','dispatcher','responder','hospital','police','admin']}>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/command-center" element={
                    <ProtectedRoute allowedRoles={['dispatcher','admin']}>
                      <CommandCenterPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/hospitals" element={
                    <ProtectedRoute allowedRoles={['hospital','admin','dispatcher']}>
                      <HospitalsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ambulances" element={
                    <ProtectedRoute allowedRoles={['responder','admin']}>
                      <AmbulancesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/police" element={
                    <ProtectedRoute allowedRoles={['police','admin']}>
                      <PolicePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/fire" element={
                    <ProtectedRoute allowedRoles={['police','admin']}>
                      <FirePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/history" element={
                    <ProtectedRoute allowedRoles={['citizen','dispatcher','admin']}>
                      <HistoryPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute allowedRoles={['dispatcher','admin','police']}>
                      <ReportsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['citizen','dispatcher','responder','hospital','police','admin']}>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              <Footer />
              <NotificationToast />
              <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
            </div>
          </BrowserRouter>
        </EmergencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
