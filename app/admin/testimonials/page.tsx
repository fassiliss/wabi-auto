'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  testimonial: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?admin=true');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
    setLoading(false);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 style={{ margin: 0, color: '#333' }}>Testimonials Management</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Manage customer reviews and testimonials</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              href="/admin/testimonials/create"
              style={{
                padding: '10px 20px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              + Add Testimonial
            </Link>
            <Link 
              href="/admin/dashboard"
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
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total</p>
            <h2 style={{ margin: '5px 0 0', color: '#333' }}>{testimonials.length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Published</p>
            <h2 style={{ margin: '5px 0 0', color: '#10b981' }}>{testimonials.filter(t => t.published).length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Featured</p>
            <h2 style={{ margin: '5px 0 0', color: '#f59e0b' }}>{testimonials.filter(t => t.featured).length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Avg Rating</p>
            <h2 style={{ margin: '5px 0 0', color: '#8b5cf6' }}>
              {testimonials.length > 0 
                ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                : '0'
              } ⭐
            </h2>
          </div>
        </div>

        {/* Search */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Testimonials List */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}>
          {filteredTestimonials.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#999' }}>
              <p>No testimonials found</p>
              <Link 
                href="/admin/testimonials/create"
                style={{
                  marginTop: '20px',
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Add Your First Testimonial
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Position</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Rating</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Testimonial</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '15px', color: '#111827', fontWeight: '500' }}>
                        {testimonial.name}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        {testimonial.position}
                        {testimonial.company && ` - ${testimonial.company}`}
                      </td>
                      <td style={{ padding: '15px' }}>
                        {'⭐'.repeat(testimonial.rating)}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px', maxWidth: '300px' }}>
                        {testimonial.testimonial.substring(0, 100)}...
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                          <button
                            onClick={() => togglePublish(testimonial._id, testimonial.published)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: testimonial.published ? '#10b981' : '#6b7280',
                              color: 'white',
                              fontWeight: '600',
                              fontSize: '12px',
                              cursor: 'pointer',
                            }}
                          >
                            {testimonial.published ? 'Published' : 'Hidden'}
                          </button>
                          <button
                            onClick={() => toggleFeatured(testimonial._id, testimonial.featured)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: testimonial.featured ? '#f59e0b' : '#e5e7eb',
                              color: testimonial.featured ? 'white' : '#374151',
                              fontWeight: '600',
                              fontSize: '12px',
                              cursor: 'pointer',
                            }}
                          >
                            {testimonial.featured ? '⭐ Featured' : 'Feature'}
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link
                            href={`/admin/testimonials/edit/${testimonial._id}`}
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
                            onClick={() => deleteTestimonial(testimonial._id)}
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
