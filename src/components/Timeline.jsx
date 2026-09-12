import React from 'react';
import { CheckCircle2, Clock, MapPin, ShieldCheck, Check } from 'lucide-react';

export default function Timeline({ currentStatus = 'Responder On Route', reportedTime = '' }) {
  const steps = [
    { title: 'Reported', subtitle: reportedTime ? reportedTime.split(' ')[1] || 'Logged' : 'Logged' },
    { title: 'Assigned', subtitle: 'Units Mobilized' },
    { title: 'Responder On Route', subtitle: 'En Route' },
    { title: 'Responder Arrived', subtitle: 'On Site Triage' },
    { title: 'Hospital Transfer', subtitle: 'ER Transit' },
    { title: 'Resolved', subtitle: 'Case Closed' }
  ];

  const getStepIndex = (statusStr) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('report')) return 0;
    if (s.includes('assigned')) return 1;
    if (s.includes('route')) return 2;
    if (s.includes('arrived')) return 3;
    if (s.includes('transfer') || s.includes('hospital')) return 4;
    if (s.includes('resolve') || s.includes('closed')) return 5;
    return 2; // Default to step 2 (Responder On Route)
  };

  const activeIndex = getStepIndex(currentStatus);

  return (
    <div style={{ padding: '1.25rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '0.4rem',
        position: 'relative',
        textAlign: 'center'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: isDone 
                  ? (isCurrent ? 'var(--color-primary)' : 'var(--color-success)') 
                  : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${isDone ? (isCurrent ? '#DC2626' : '#22C55E') : 'var(--border-color)'}`,
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                boxShadow: isCurrent ? '0 0 15px rgba(220, 38, 38, 0.5)' : 'none'
              }}>
                {isDone ? <Check size={16} /> : idx + 1}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isDone ? 'var(--text-main)' : 'var(--text-light)', lineHeight: 1.2 }}>
                {step.title}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {step.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
