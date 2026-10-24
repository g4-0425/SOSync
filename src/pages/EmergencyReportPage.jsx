import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';
import { emergencyTypes } from '../data/mockDatabase';
import { ShieldAlert, PhoneCall, User, Phone, MapPin } from 'lucide-react';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';

export default function EmergencyReportPage() {
  const navigate = useNavigate();
  const { addEmergencyReport, triggerSimulatedCall } = useEmergency();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    emergencyType: 'Road Accident',
    priority: 'Critical',
    location: '',
    sector: 'Sector 22',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone required';
    else if (!/^[+]?\d{10,15}$/.test(formData.phone.replace(/\s+/g, '')))
      newErrors.phone = 'Invalid phone format';
    if (!formData.location.trim()) newErrors.location = 'Location required';
    if (!formData.sector.trim()) newErrors.sector = 'Sector required';
    if (!formData.description.trim()) newErrors.description = 'Description required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const newId = await addEmergencyReport(formData);
      navigate(`/emergency/${newId}`);
    } catch (err) {
      console.error('Error submitting emergency report:', err);
    }
    setIsSubmitting(false);
  };

  const emergencyOptions = emergencyTypes.map(t => ({ value: t.name, label: t.name }));
  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' },
    { value: 'Critical', label: 'Critical Emergency' }
  ];

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 850 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: 30,
              fontSize: '0.85rem',
              fontWeight: 700,
              background: 'rgba(220, 38, 38, 0.12)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(220, 38, 38, 0.25)'
            }}>
              <ShieldAlert size={16} />
              <span>Emergency Reporting Portal</span>
            </div>
            <button
              onClick={() => triggerSimulatedCall('Emergency Services', '112')}
              className="btn btn-sos"
              style={{ padding: '0.35rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <PhoneCall size={16} />
              CALL 112 DIRECT
            </button>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Dispatch Immediate Emergency Aid</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0.5rem auto 0 auto' }}>
            Fill in incident details below. SOSync rule‑based algorithm mobilizes closest Chandigarh paramedics, fire tenders, and police patrols while recommending optimal ER wards.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Contact Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FormInput
                id="fullName"
                label="Full Name of Reporter"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Suraj Verma"
                required
                icon={User}
                error={errors.fullName}
              />
              <FormInput
                id="phone"
                label="Contact Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98123 45678"
                required
                icon={Phone}
                error={errors.phone}
              />
            </div>
            {/* Type & Priority Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <FormSelect
                id="emergencyType"
                label="Emergency Type Category"
                name="emergencyType"
                options={emergencyOptions}
                value={formData.emergencyType}
                onChange={handleChange}
                required
                error={errors.emergencyType}
              />
              <FormSelect
                id="priority"
                label="Incident Priority Scale"
                name="priority"
                options={priorityOptions}
                value={formData.priority}
                onChange={handleChange}
                required
                error={errors.priority}
              />
            </div>
            {/* Location & Sector Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '1.5rem' }}>
              <FormInput
                id="location"
                label="Specific Landmark / Street Address"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Near Light Point / Sector Market Plaza"
                required
                icon={MapPin}
                error={errors.location}
              />
              <FormInput
                id="sector"
                label="Sector"
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Sector 22"
                required
                error={errors.sector}
              />
            </div>
            {/* Description */}
            <FormTextarea
              id="description"
              label="Incident Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a concise description of the emergency..."
              required
              rows={4}
              error={errors.description}
            />
            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.9rem', opacity: isSubmitting ? 0.6 : 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Emergency Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
