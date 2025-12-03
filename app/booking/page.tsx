'use client';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function BookingPage() {
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

  return (
    <>
      {/* Page Banner with Image Background */}
      <div
        style={{
          backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.7), rgba(118, 75, 162, 0.7)), url(/images/booking-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '100px 0 80px',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              color: 'white', 
              fontSize: '42px', 
              fontWeight: 'bold',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
              Book Your Service
            </h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '16px',
              gap: '12px',
            }}>
              <a href="/" style={{ 
                color: 'rgba(255,255,255,0.9)', 
                textDecoration: 'none',
                fontWeight: '500',
              }}>
                Home
              </a>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>
              <span style={{ color: 'white', fontWeight: '600' }}>
                Book Appointment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <section className="te-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <h2 style={{ color: '#333', marginBottom: '10px' }}>Schedule Your Service</h2>
                  <p style={{ color: '#666' }}>Fill out the form below and we&apos;ll confirm your appointment</p>
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
                  {/* Customer Information */}
                  <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                    Customer Information
                  </h3>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '20px', marginTop: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                    Vehicle Information
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Year *
                      </label>
                      <input
                        type="text"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        required
                        placeholder="2020"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Make *
                      </label>
                      <input
                        type="text"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        required
                        placeholder="Toyota"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Model *
                      </label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required
                        placeholder="Camry"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                      License Plate (Optional)
                    </label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      placeholder="ABC-1234"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Service Details */}
                  <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '20px', marginTop: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                    Service Details
                  </h3>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
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
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                        Preferred Time *
                      </label>
                      <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                        }}
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
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific issues or requests..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                      Notification Preference
                    </label>
                    <select
                      name="notificationPreference"
                      value={formData.notificationPreference}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="both">Both Email & SMS</option>
                    </select>
                  </div>

                  {/* Submit Button */}
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

      <Footer />

      <style jsx>{`
        .dark form input,
        .dark form select,
        .dark form textarea {
          background: #1a1a1a;
          color: #ffffff;
          border-color: #333;
        }

        .dark form label {
          color: #e5e5e5 !important;
        }

        .dark h2, .dark h3 {
          color: #ffffff !important;
        }

        .dark p {
          color: #d1d5db !important;
        }

        .dark div[style*="background: white"] {
          background: #1a1a1a !important;
        }
      `}</style>
    </>
  );
}
