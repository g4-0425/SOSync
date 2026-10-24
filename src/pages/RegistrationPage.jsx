// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { User, Lock, Mail, Phone } from 'lucide-react';
import FormInput from '../components/FormInput';

export default function RegistrationPage() {
  const { register } = useAuth();
  const { showToast } = useEmergency();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });
    setIsSubmitting(false);
    if (result.success) {
      showToast('Registration successful! Please log in.', 'success');
      navigate('/login');
    } else {
      showToast(result.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '6rem', display: 'flex', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,139,34,0.15)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <User size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Citizen Registration</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create an account to report emergencies and view your history.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormInput
              id="name"
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              icon={User}
              error={errors.name}
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
              error={errors.email}
            />
            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              icon={Phone}
              error={errors.phone}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              icon={Lock}
              error={errors.password}
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              icon={Lock}
              error={errors.confirmPassword}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', opacity: isSubmitting ? 0.6 : 1 }} disabled={isSubmitting}>
              {isSubmitting ? 'Registering…' : 'Register Account'}
            </button>
          </form>
          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)' }}>Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
