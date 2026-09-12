import React from 'react';
import { ShieldCheck, Code2, Database, Layout, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: 30,
            fontSize: '0.85rem',
            fontWeight: 700,
            background: 'rgba(37,99,235,0.12)',
            color: 'var(--color-accent)',
            border: '1px solid rgba(37,99,235,0.25)',
            marginBottom: '1rem'
          }}>
            <Code2 size={16} />
            <span>B.Tech Semester 3 Major Academic Project</span>
          </div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 900 }}>System Architecture & Design</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>
            Technical implementation summary of SOSync – Smart Emergency Response System.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-primary)' }}>
            Project Overview & Core Mission
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            SOSync is a frontend + mock database emergency management architecture developed for Chandigarh. It bridges citizens, ambulance fleets, hospital wards (PGIMER, GMCH 32, Fortis, Max), police stations, and fire units into a unified telemetry grid.
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Technology Stack</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--color-accent)' }}>React + Vite</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SPA Routing & Modular JSX</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Leaflet.js + OSM</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chandigarh Vector GIS Grid</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--color-success)' }}>LocalStorage & ES6+</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>State Persistence & Array Ops</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
