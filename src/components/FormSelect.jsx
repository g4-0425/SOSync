// src/components/FormSelect.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable select (dropdown) component with label and error handling.
 * Accessible: label linked via htmlFor/id, error announced with aria-live.
 */
export default function FormSelect({ id, label, options, value, onChange, required, error }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label htmlFor={id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
        {label}{required && ' *'}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'var(--bg-surface-solid)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.95rem',
          color: 'var(--text-main)'
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <div role="alert" aria-live="assertive" style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string
};
