'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ServiceRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
  createdAt: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return () => observer.disconnect();
    }
    fetchRequests();

    return () => observer.disconnect();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/service-requests');
      if (res.status === 401) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/service-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    try {
      const res = await fetch(`/api/service-requests/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleLogout = () => {
    fetch('/api/admin/logout', { method: 'POST' });
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm) ||
      req.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusColors = {
    pending: '#fbbf24',
    contacted: '#60a5fa',
    scheduled: '#a78bfa',
    completed: '#34d399',
  };

  const pageBg = isDark ? '#0a0f1a' : '#f3f4f6';
  const panelBg = isDark ? '#111827' : '#ffffff';
  const panelBorder = isDark ? '1px solid #243041' : '1px solid #e5e7eb';
  const headingColor = isDark ? '#f9fafb' : '#111827';
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const tableHeaderBg = isDark ? '#172033' : '#f9fafb';
  const rowBorder = isDark ? '#253244' : '#e5e7eb';
  const inputBg = isDark ? '#0b1220' : '#ffffff';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '120px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner Section - Pushed BELOW header */}
      <div style={{
        marginTop: '140px', // ✅ This pushes the banner DOWN below the header
        background: 'linear-gradient(rgba(102, 126, 234, 0.75), rgba(118, 75, 162, 0.75)), url(/images/booking-banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}>
            Admin Dashboard
          </h1>
          <p style={{ 
            fontSize: '18px', 
            marginBottom: '30px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}>
            Wabi Auto Service Management
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 30px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            Logout
          </button>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/admin/customers"
              style={{
                padding: '12px 24px',
                background: '#111827',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(17, 24, 39, 0.3)',
              }}
            >
              Manage Customers
            </Link>
            <Link
              href="/admin/bookings"
              style={{
                padding: '12px 24px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              Manage Bookings
            </Link>
            <Link
              href="/admin/chats"
              style={{
                padding: '12px 24px',
                background: '#10b981',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              Website Chats
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ minHeight: '100vh', background: pageBg, padding: '40px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: panelBg, border: panelBorder, padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0, color: mutedColor, fontSize: '14px' }}>Total Requests</p>
              <h2 style={{ margin: '5px 0 0', color: headingColor }}>{requests.length}</h2>
            </div>
            <div style={{ background: panelBg, border: panelBorder, padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0, color: mutedColor, fontSize: '14px' }}>Pending</p>
              <h2 style={{ margin: '5px 0 0', color: statusColors.pending }}>{requests.filter(r => r.status === 'pending').length}</h2>
            </div>
            <div style={{ background: panelBg, border: panelBorder, padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0, color: mutedColor, fontSize: '14px' }}>Scheduled</p>
              <h2 style={{ margin: '5px 0 0', color: statusColors.scheduled }}>{requests.filter(r => r.status === 'scheduled').length}</h2>
            </div>
            <div style={{ background: panelBg, border: panelBorder, padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0, color: mutedColor, fontSize: '14px' }}>Completed</p>
              <h2 style={{ margin: '5px 0 0', color: statusColors.completed }}>{requests.filter(r => r.status === 'completed').length}</h2>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            background: panelBg,
            border: panelBorder,
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search by name, email, phone, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: inputBg,
                  color: textColor,
                }}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${isDark ? '#374151' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  background: inputBg,
                  color: textColor,
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Requests Table */}
          <div style={{
            background: panelBg,
            border: panelBorder,
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
            {filteredRequests.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: mutedColor }}>
                <p>No service requests found</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: tableHeaderBg, borderBottom: `2px solid ${rowBorder}` }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Date</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Contact</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Service</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Message</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: textColor }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((req) => (
                      <tr key={req._id} style={{ borderBottom: `1px solid ${rowBorder}` }}>
                        <td style={{ padding: '15px', color: mutedColor }}>
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', color: headingColor, fontWeight: '500' }}>{req.name}</td>
                        <td style={{ padding: '15px', color: mutedColor, fontSize: '14px' }}>
                          <div>{req.email}</div>
                          <div>{req.phone}</div>
                        </td>
                        <td style={{ padding: '15px', color: headingColor }}>{req.service}</td>
                        <td style={{ padding: '15px', color: mutedColor, fontSize: '14px', maxWidth: '200px' }}>
                          {req.message || 'No message'}
                        </td>
                        <td style={{ padding: '15px' }}>
                          <select
                            value={req.status}
                            onChange={(e) => updateStatus(req._id, e.target.value)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: 'none',
                              background: statusColors[req.status],
                              color: 'white',
                              fontWeight: '600',
                              fontSize: '13px',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <button
                            onClick={() => deleteRequest(req._id)}
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
    </>
  );
}
