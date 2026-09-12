import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'var(--color-primary)' }) {
  return (
    <div className="glass-panel" style={{
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: -10,
        right: -10,
        width: 80,
        height: 80,
        background: color,
        opacity: 0.08,
        borderRadius: '50%',
        blur: '10px'
      }} />

      <div style={{
        width: 54,
        height: 54,
        borderRadius: 'var(--border-radius-sm)',
        background: `rgba(255,255,255,0.03)`,
        border: `1px solid ${color}`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={26} />
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1, margin: '0.2rem 0' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
