import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { Shield, Lock, User } from 'lucide-react';
import FormInput from '../components/FormInput';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useEmergency();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('OFFICER-101'); // badgeId or email
  const [passcode, setPasscode] = useState('sosync2026');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'identifier') setIdentifier(value);
    else if (name === 'passcode') setPasscode(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim()) newErrors.identifier = 'Badge ID or Email required';
    if (!passcode.trim()) newErrors.passcode = 'Passcode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const result = await login(identifier, passcode);
    setIsSubmitting(false);
    if (result.success) {
      showToast(`Session authenticated for ${result.user.role} (${identifier})!`, 'success');
      // Role‑based redirect
      let target = '/dashboard';
      switch (result.user.role) {
        case 'Dispatcher':
        case 'Administrator':
        case 'Citizen':
          target = '/dashboard';
          break;
        case 'Ambulance':
          target = '/ambulances';
          break;
        case 'HospitalStaff':
          target = '/hospitals';
          break;
        case 'Police':
          target = '/police';
          break;
        default:
          target = '/dashboard';
      }
      navigate(target);
    } else {
      showToast(result.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(220,38,38,0.15)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Shield size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Agency Officer Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your officer badge token to access the encrypted Admin Dashboard.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <FormInput
              id="identifier"
              label="Badge ID or Email"
              type="text"
              name="identifier"
              value={identifier}
              onChange={handleChange}
              required
              icon={User}
              error={errors.identifier}
            />
            <FormInput
              id="passcode"
              label="Passcode"
              type="password"
              name="passcode"
              value={passcode}
              onChange={handleChange}
              required
              icon={Lock}
              error={errors.passcode}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.9rem', opacity: isSubmitting ? 0.6 : 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Login to Console'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
