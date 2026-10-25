import React from 'react';

export default function AdminPage() {
  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '0.5rem' }}>Admin Panel</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>This is a placeholder admin dashboard. Add management UI here.</p>
      </div>
    </div>
  );
}
