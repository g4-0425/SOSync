import React from 'react';
import { NavLink } from 'react-router-dom';
import { AlertOctagon, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="page-animate" style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 500 }}>
        <AlertOctagon size={64} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>404 Not Found</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: '1rem 0 2rem 0' }}>
          The requested emergency telemetry route or resource could not be found.
        </p>
        <NavLink to="/" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
          <Home size={18} />
          Return to Operations Home
        </NavLink>
      </div>
    </div>
  );
}
