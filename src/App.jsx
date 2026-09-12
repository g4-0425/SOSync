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
import NotFoundPage from './pages/NotFoundPage';

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
                  
                  {/* Protected Admin Route */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/hospitals" element={<HospitalsPage />} />
                  <Route path="/ambulances" element={<AmbulancesPage />} />
                  <Route path="/police" element={<PolicePage />} />
                  <Route path="/fire" element={<FirePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
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
