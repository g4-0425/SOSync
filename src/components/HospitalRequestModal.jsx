import React, { useState, useEffect } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useAuth } from '../context/AuthContext';

/**
 * Simple modal for submitting a hospital assistance request.
 * Props:
 *  - isOpen: boolean – whether the modal is visible
 *  - onClose: () => void – called when the modal should be dismissed
 *  - hospitalId: string – id of the hospital the request targets
 *  - preselectedIncidentId?: string – optional incident to pre‑select
 */
export default function HospitalRequestModal({ isOpen, onClose, hospitalId, preselectedIncidentId }) {
  const { addHospitalRequest, emergencies, hospitals } = useEmergency();
  const { user } = useAuth();
  const [incidentId, setIncidentId] = useState(preselectedIncidentId || '');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Focus first input when opened
  useEffect(() => {
    if (isOpen) {
      setIncidentId(preselectedIncidentId || '');
      setNotes('');
    }
  }, [isOpen, preselectedIncidentId]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!hospitalId) return;
    setSubmitting(true);
    try {
      await addHospitalRequest({
        incidentId: incidentId || null,
        hospitalId,
        details: { notes },
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const hospital = hospitals.find(h => h.id === hospitalId);

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-content glass-panel"
        style={{
          background: 'var(--bg-surface-solid)',
          padding: '2rem',
          borderRadius: 'var(--border-radius-lg)',
          width: 'min(90vw, 400px)',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Request Hospital Assistance</h2>
        <p><strong>Hospital:</strong> {hospital?.name ?? hospitalId}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              Incident (optional):
              <select
                value={incidentId}
                onChange={e => setIncidentId(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.4rem',
                }}
              >
                <option value="">-- None --</option>
                {emergencies
                  .filter(e => e.reporterName && user && e.reporterName === user.name)
                  .map(e => (
                    <option key={e.id} value={e.id}>
                      {e.id} – {e.type}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label>
              Notes:
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.4rem',
                }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
