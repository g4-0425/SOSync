// src/components/FormInput.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable input component with label, optional icon and error display.
 * Accessible: label is linked via htmlFor/id, error is announced with aria-live.
 */
export default function FormInput({ id, label, type = 'text', value, onChange, placeholder, required, icon: Icon, error }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label htmlFor={id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
        {label}{required && ' *'}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            padding: Icon ? '0.85rem 1rem 0.85rem 2.6rem' : '0.85rem 1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.95rem',
          }}
        />
        {Icon && (
          <Icon
            size={18}
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-light)',
            }}
          />
        )}
      </div>
      {error && (
        <div role="alert" aria-live="assertive" style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.elementType,
  error: PropTypes.string,
};
