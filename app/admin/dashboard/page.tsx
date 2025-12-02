'use client';
import { useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/service-requests');
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
            <h1 style={{ margin: 0, color: '#333' }}>Admin Dashboard</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Wabi Auto Service Requests</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Requests</p>
            <h2 style={{ margin: '5px 0 0', color: '#333' }}>{requests.length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Pending</p>
            <h2 style={{ margin: '5px 0 0', color: statusColors.pending }}>{requests.filter(r => r.status === 'pending').length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Scheduled</p>
            <h2 style={{ margin: '5px 0 0', color: statusColors.scheduled }}>{requests.filter(r => r.status === 'scheduled').length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Completed</p>
            <h2 style={{ margin: '5px 0 0', color: statusColors.completed }}>{requests.filter(r => r.status === 'completed').length}</h2>
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
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}>
          {filteredRequests.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#999' }}>
              <p>No service requests found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Contact</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Service</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Message</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '15px', color: '#6b7280' }}>
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '15px', color: '#111827', fontWeight: '500' }}>{req.name}</td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        <div>{req.email}</div>
                        <div>{req.phone}</div>
                      </td>
                      <td style={{ padding: '15px', color: '#111827' }}>{req.service}</td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px', maxWidth: '200px' }}>
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
  );
}
