// src/components/FormTextarea.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable textarea component with label and error handling.
 * Accessible: label linked via htmlFor/id, error announced with aria-live.
 */
export default function FormTextarea({ id, label, value, onChange, placeholder, required, rows = 4, error }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label htmlFor={id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
        {label}{required && ' *'}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.95rem',
          resize: 'vertical'
        }}
      />
      {error && (
        <div role="alert" aria-live="assertive" style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}

FormTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  error: PropTypes.string
};
