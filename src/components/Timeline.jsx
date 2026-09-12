import React from 'react';
import { CheckCircle2, Clock, MapPin, ShieldCheck, Check } from 'lucide-react';

export default function Timeline({ currentStatus = 'Responder On Route' }) {
  const steps = [
    { title: 'Reported', subtitle: 'Incident Logged' },
    { title: 'Dispatcher Assigned', subtitle: 'Units Mobilized' },
    { title: 'Responder On Route', subtitle: 'En Route Corridor' },
    { title: 'Responder Arrived', subtitle: 'On Site Triage' },
    { title: 'Resolved', subtitle: 'Case Closed' }
  ];

  const getStepIndex = (statusStr) => {
    const idx = steps.findIndex(s => s.title.toLowerCase() === statusStr.toLowerCase());
    return idx >= 0 ? idx : 2; // Default to step 2 if on route
  };

  const activeIndex = getStepIndex(currentStatus);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.5rem',
        position: 'relative',
        textAlign: 'center'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: isDone 
                  ? (isCurrent ? 'var(--color-primary)' : 'var(--color-success)') 
                  : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${isDone ? (isCurrent ? '#DC2626' : '#22C55E') : 'var(--border-color)'}`,
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                boxShadow: isCurrent ? '0 0 15px rgba(220, 38, 38, 0.5)' : 'none'
              }}>
                {isDone ? <Check size={18} /> : idx + 1}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDone ? 'var(--text-main)' : 'var(--text-light)' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {step.subtitle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
