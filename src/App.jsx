import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { EmergencyProvider } from './context/EmergencyContext';
import useStore from './store';

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
import MyHospitalRequestsPage from './pages/MyHospitalRequestsPage';
import MyEmergenciesPage from './pages/MyEmergenciesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import RegistrationPage from './pages/RegistrationPage';
import OfficerRequestsPage from './pages/OfficerRequestsPage';


export default function App() {
  // Initialize the simulation loop from the store (runs once).
  React.useEffect(() => {
    // Call the init function if not already called.
    const init = useStore.getState()._initSimulation;
    if (init) init();
  }, []);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <EmergencyProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
                    <ProtectedRoute allowedRoles={['admin','dispatcher','responder','hospital','police']}>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                            <Route path="/my-requests" element={
            <ProtectedRoute allowedRoles={['citizen','admin','dispatcher']}>
              <MyHospitalRequestsPage />
            </ProtectedRoute>
          } />
          <Route path="/my-emergencies" element={
            <ProtectedRoute allowedRoles={['citizen','admin','dispatcher']}>
              <MyEmergenciesPage />
            </ProtectedRoute>
          } />
                  <Route path="/hospitals" element={
                    <ProtectedRoute allowedRoles={['hospital','admin','dispatcher','citizen']}>
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
                    <ProtectedRoute allowedRoles={['dispatcher','admin']}>
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
                    <ProtectedRoute allowedRoles={['admin','dispatcher','responder','hospital','police']}>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/officer-login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/officer-requests" element={
                    <ProtectedRoute allowedRoles={['admin','dispatcher','officer']}>
                      <OfficerRequestsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginPage />} />


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
