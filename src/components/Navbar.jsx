import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { 
  Sun, 
  Moon, 
  Search, 
  AlertOctagon, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  ShieldAlert,
  MapPin,
  HeartPulse,
  Activity,
  FileText,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ onOpenLogin }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, showToast, triggerSimulatedCall } = useEmergency();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const handleSosClick = () => {
    showToast("CRITICAL SOS BROADCAST SIGNAL DETECTED! Triangulating coordinates...", "error");
    navigate('/emergency');
  };

  return (
    <header className="header" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 'var(--header-height)',
      zIndex: 1000,
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--glass-border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <NavLink to="/" className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 800,
          fontSize: '1.6rem',
          letterSpacing: '-0.03em',
          color: 'var(--text-main)'
        }}>
          <svg className="logo-svg" viewBox="0 0 100 100" fill="none" style={{ width: 40, height: 40 }}>
            <circle cx="50" cy="50" r="45" stroke="#DC2626" strokeWidth="8" fill="none" />
            <path d="M50 20V80" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
            <path d="M20 50H80" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
            <circle cx="50" cy="50" r="12" fill="#2563EB" />
            <path d="M44 50H56M50 44V56" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="logo-text">SO<span style={{ color: 'var(--color-primary)' }}>Sync</span></div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/command-center" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Command Center</NavLink>
          <NavLink to="/emergency" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Report Emergency</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
          <NavLink to="/hospitals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Hospitals</NavLink>
          <NavLink to="/ambulances" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Ambulances</NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>History</NavLink>
          <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Reports</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="theme-toggle-btn"
              title="Notifications Ticker"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '50%'
                }} />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: 320,
                maxHeight: 380,
                overflowY: 'auto',
                padding: '1rem',
                zIndex: 1050,
                backgroundColor: 'var(--bg-surface-solid)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Live Telemetry Alerts
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{notifications.length} Logs</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {notifications.map(item => (
                    <div key={item.id} style={{
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      borderLeft: '3px solid var(--color-primary)'
                    }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '0.15rem' }}>{item.time}</div>
                      <div>{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Light/Dark Theme">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CALL 112 Direct Dial Button */}
          <button 
            onClick={() => triggerSimulatedCall('Emergency Services', '112')}
            className="btn btn-sos" 
            style={{ 
              padding: '0.6rem 1.1rem', 
              fontSize: '0.85rem', 
              backgroundColor: '#DC2626',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            title="Direct Dial National Emergency Service"
          >
            <PhoneCall size={16} />
            CALL 112
          </button>

          {/* SOS Emergency Button */}
          <button onClick={handleSosClick} className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#EF4444', borderColor: 'rgba(220, 38, 38, 0.4)' }}>
            <AlertOctagon size={16} />
            SOS
          </button>

          {/* Profile or Login */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <NavLink to="/profile" className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                <User size={16} />
                {user.name.split(' ')[0]}
              </NavLink>
              <button onClick={logout} className="theme-toggle-btn" title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenLogin} className="btn btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}>
              Officer Login
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-toggle"
            style={{ display: 'none', background: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
