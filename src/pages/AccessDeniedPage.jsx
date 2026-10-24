// src/pages/AccessDeniedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '6rem', display: 'flex', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--bg-surface-solid)' }}>
          <ShieldAlert size={48} style={{ color: 'var(--color-error)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Access Denied</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            You do not have permission to view this page.
          </p>
          <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 1.2rem' }}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
