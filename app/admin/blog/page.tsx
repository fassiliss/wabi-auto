'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published: boolean;
  views: number;
  createdAt: string;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?admin=true');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

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
            <h1 style={{ margin: 0, color: '#333' }}>Blog Management</h1>
            <p style={{ margin: '5px 0 0', color: '#666' }}>Create and manage blog posts</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              href="/admin/blog/create"
              style={{
                padding: '10px 20px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              + Create New Post
            </Link>
            <Link 
              href="/admin"
              style={{
                padding: '10px 20px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Posts</p>
            <h2 style={{ margin: '5px 0 0', color: '#333' }}>{posts.length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Published</p>
            <h2 style={{ margin: '5px 0 0', color: '#10b981' }}>{posts.filter(p => p.published).length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Drafts</p>
            <h2 style={{ margin: '5px 0 0', color: '#f59e0b' }}>{posts.filter(p => !p.published).length}</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Views</p>
            <h2 style={{ margin: '5px 0 0', color: '#8b5cf6' }}>{posts.reduce((sum, p) => sum + p.views, 0)}</h2>
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
              placeholder="Search posts..."
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Categories</option>
              <option value="Car Maintenance">Car Maintenance</option>
              <option value="Repair Tips">Repair Tips</option>
              <option value="Auto News">Auto News</option>
              <option value="How To">How To</option>
              <option value="Company News">Company News</option>
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}>
          {filteredPosts.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#999' }}>
              <p>No blog posts found</p>
              <Link 
                href="/admin/blog/create"
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
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Title</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Category</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Views</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '15px', color: '#111827', fontWeight: '500', maxWidth: '300px' }}>
                        {post.title}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        {post.category}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <button
                          onClick={() => togglePublish(post._id, post.published)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: post.published ? '#10b981' : '#f59e0b',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280' }}>
                        {post.views}
                      </td>
                      <td style={{ padding: '15px', color: '#6b7280', fontSize: '14px' }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link
                            href={`/admin/blog/edit/${post._id}`}
                            style={{
                              padding: '6px 12px',
                              background: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              textDecoration: 'none',
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deletePost(post._id)}
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
