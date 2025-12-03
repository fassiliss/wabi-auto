'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBooking() {
  const params = useParams();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'scheduled',
    adminNotes: '',
    estimatedCost: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`/api/bookings/${params.id}`);
      const data = await res.json();
      if (data.success) {
        const booking = data.data;
        setFormData({
          customerName: booking.customerName,
          email: booking.email,
          phone: booking.phone,
          vehicleMake: booking.vehicleMake,
          vehicleModel: booking.vehicleModel,
          vehicleYear: booking.vehicleYear,
          serviceType: booking.serviceType,
          appointmentDate: booking.appointmentDate.split('T')[0],
          appointmentTime: booking.appointmentTime,
          status: booking.status,
          adminNotes: booking.adminNotes || '',
          estimatedCost: booking.estimatedCost || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'estimatedCost' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/bookings');
      } else {
        setError(data.error || 'Failed to update booking');
      }
    } catch (error) {
      setError('Failed to update booking');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', paddingBottom: '100px' }}>
        <div style={{
          background: 'white',
          padding: '20px 30px',
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#333' }}>Edit Booking</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Update booking details and status</p>
          </div>
          <Link 
            href="/admin/bookings"
            style={{
              padding: '10px 20px',
              background: '#6b7280',
              color: 'white',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            ← Back
          </Link>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
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
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Year
                </label>
                <input
                  type="text"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
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
                  Make
                </label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
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
                  Model
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Date
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
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
                  Time
                </label>
                <input
                  type="text"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
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
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
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
                  <option value="scheduled">Scheduled</option>
                  <option value="checked-in">Checked In</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Estimated Cost ($)
              </label>
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                min="0"
                step="0.01"
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

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Admin Notes
              </label>
              <textarea
                name="adminNotes"
                value={formData.adminNotes}
                onChange={handleChange}
                rows={4}
                placeholder="Internal notes about the service..."
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

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '14px 28px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? 'Saving...' : 'Update Booking'}
              </button>
              <Link
                href="/admin/bookings"
                style={{
                  padding: '14px 28px',
                  background: '#e5e7eb',
                  color: '#374151',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
