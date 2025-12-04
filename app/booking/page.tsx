'use client';
import { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

export default function BookingPage() {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    serviceType: 'Engine Diagnostics',
    appointmentDate: '',
    appointmentTime: '09:00',
    notes: '',
    notificationPreference: 'email',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          customerName: '',
          email: '',
          phone: '',
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: '',
          licensePlate: '',
          serviceType: 'Engine Diagnostics',
          appointmentDate: '',
          appointmentTime: '09:00',
          notes: '',
          notificationPreference: 'email',
        });
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
    }

    setLoading(false);
  };

  const wrapperStyle = {
    background: isDark ? '#0f0f0f' : 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.08)',
    border: isDark ? '1px solid #222' : 'none',
  };

  const titleStyle = {
    color: isDark ? '#ffffff' : '#333',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    color: isDark ? '#d1d5db' : '#666',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    color: isDark ? '#ffffff' : '#333',
    marginBottom: '20px',
    marginTop: '30px',
    borderBottom: `2px solid ${isDark ? '#333' : '#e5e7eb'}`,
    paddingBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: isDark ? '#e5e5e5' : '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: `1px solid ${isDark ? '#333' : '#ddd'}`,
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box' as const,
    background: isDark ? '#0a0a0a' : 'white',
    color: isDark ? '#ffffff' : '#333',
    fontFamily: 'inherit',
  };

  return (
    <>
      <div style={{ marginTop: '140px' }}><PageBanner 
        title="Book Your Service"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Book Appointment' }
        ]}
      />

      <section className="te-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div style={wrapperStyle}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <h2 style={titleStyle}>Schedule Your Service</h2>
                  <p style={subtitleStyle}>Fill out the form below and we&apos;ll confirm your appointment</p>
                </div>

                {success && (
                  <div style={{
                    padding: '20px',
                    background: '#d4edda',
                    color: '#155724',
                    borderRadius: '8px',
                    marginBottom: '30px',
                    textAlign: 'center',
                  }}>
                    <strong>✓ Booking Confirmed!</strong>
                    <p style={{ margin: '10px 0 0' }}>We&apos;ve sent a confirmation email to {formData.email}</p>
                  </div>
                )}

                {error && (
                  <div style={{
                    padding: '15px',
                    background: '#fee',
                    color: '#c33',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <h3 style={sectionTitleStyle}>Customer Information</h3>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <h3 style={sectionTitleStyle}>Vehicle Information</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={labelStyle}>Year *</label>
                      <input
                        type="text"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        required
                        placeholder="2020"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Make *</label>
                      <input
                        type="text"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        required
                        placeholder="Toyota"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Model *</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required
                        placeholder="Camry"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>License Plate (Optional)</label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      placeholder="ABC-1234"
                      style={inputStyle}
                    />
                  </div>

                  <h3 style={sectionTitleStyle}>Service Details</h3>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Service Type *</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="Engine Diagnostics">Engine Diagnostics</option>
                      <option value="Suspension Tuning">Suspension Tuning</option>
                      <option value="Transmission Service">Transmission Service</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Brake Repair">Brake Repair</option>
                      <option value="Tire Service">Tire Service</option>
                      <option value="AC Service">AC Service</option>
                      <option value="General Maintenance">General Maintenance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={labelStyle}>Preferred Date *</label>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Preferred Time *</label>
                      <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific issues or requests..."
                      style={{ ...inputStyle, resize: 'vertical' as const }}
                    />
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={labelStyle}>Notification Preference</label>
                    <select
                      name="notificationPreference"
                      value={formData.notificationPreference}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="both">Both Email & SMS</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Submitting...' : 'Book Appointment'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div><Footer />
    </>
  );
}
