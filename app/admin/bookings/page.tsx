'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notificationSent: boolean;
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      `${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'scheduled': '#3b82f6',
      'checked-in': '#f59e0b',
      'in-progress': '#8b5cf6',
      'completed': '#10b981',
      'cancelled': '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
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
            <h1 style={{ margin: 0, color: '#333' }}>Service Bookings</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Manage appointments and check-ins</p>
          </div>
          <Link 
            href="/admin"
            style={{
              padding: '10px 20px',
              background: '#6b7280',
              color: 'white',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Bookings</p>
            <h2 style={{ margin: '5px 0 0', color: '#333' }}>{bookings.length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Scheduled</p>
            <h2 style={{ margin: '5px 0 0', color: '#3b82f6' }}>{bookings.filter(b => b.status === 'scheduled').length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>In Progress</p>
            <h2 style={{ margin: '5px 0 0', color: '#8b5cf6' }}>{bookings.filter(b => b.status === 'in-progress').length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Completed</p>
            <h2 style={{ margin: '5px 0 0', color: '#10b981' }}>{bookings.filter(b => b.status === 'completed').length}</h2>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by customer, vehicle, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="checked-in">Checked In</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}>
          {filteredBookings.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#999' }}>
              <p>No bookings found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Customer</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Vehicle</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Service</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date & Time</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: '500', color: '#111827' }}>{booking.customerName}</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>{booking.phone}</div>
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        {booking.serviceType}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        <div>{new Date(booking.appointmentDate).toLocaleDateString()}</div>
                        <div>{booking.appointmentTime}</div>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: getStatusColor(booking.status),
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="checked-in">Checked In</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {booking.notificationSent && (
                          <div style={{ fontSize: '11px', color: '#10b981', marginTop: '5px' }}>
                            ✓ Notified
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link
                            href={`/admin/bookings/edit/${booking._id}`}
                            style={{
                              padding: '6px 12px',
                              background: '#3b82f6',
                              color: 'white',
                              borderRadius: '6px',
                              fontSize: '13px',
                              textDecoration: 'none',
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            style={{
                              padding: '6px 12px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '13px',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
