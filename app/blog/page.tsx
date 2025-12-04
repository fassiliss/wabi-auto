'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const filteredPosts = filterCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === filterCategory);

  return (
    <>
      <div style={{ marginTop: '140px' }}><PageBanner 
        title="Our Blog"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' }
        ]}
      />

      {/* Blog Content */}
      <section className="te-py-120">
        <div className="container">
          {/* Category Filter */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['all', 'Auto News', 'Car Maintenance', 'Repair Tips', 'How To', 'Company News'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '10px 20px',
                    background: filterCategory === cat ? '#2563eb' : '#f3f4f6',
                    color: filterCategory === cat ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat === 'all' ? 'All Posts' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p>Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#666' }}>No blog posts yet</h3>
              <p style={{ color: '#999' }}>Check back soon for updates!</p>
            </div>
          ) : (
            <div className="row gy-4">
              {filteredPosts.map((post) => (
                <div key={post._id} className="col-lg-4 col-md-6">
                  <article className="blog-card">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="blog-image">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            borderRadius: '12px 12px 0 0',
                          }}
                        />
                        <span className="blog-category">{post.category}</span>
                      </div>
                    </Link>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span><i className="fa-solid fa-user"></i> {post.author}</span>
                        <span><i className="fa-solid fa-calendar"></i> {new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="blog-title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="blog-read-more">
                        Read More <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      </div><Footer />

      <style jsx>{`
        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dark .blog-card {
          background: #1a1a1a;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .blog-card:hover {
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
        }

        .blog-image {
          position: relative;
        }

        .blog-category {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #2563eb;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .blog-content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
          font-size: 13px;
          color: #666;
        }

        .dark .blog-meta {
          color: #999;
        }

        .blog-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .blog-title a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .dark .blog-title a {
          color: #ffffff;
        }

        .blog-title a:hover {
          color: #2563eb;
        }

        .dark .blog-title a:hover {
          color: #60a5fa;
        }

        .blog-excerpt {
          color: #666;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .dark .blog-excerpt {
          color: #d1d5db;
        }

        .blog-read-more {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }

        .dark .blog-read-more {
          color: #60a5fa;
        }

        .blog-read-more:hover {
          gap: 12px;
        }

        .dark button[style*="background: #f3f4f6"] {
          background: #2a2a2a !important;
          color: #d1d5db !important;
        }

        .dark h3, .dark p {
          color: #d1d5db !important;
        }
      `}</style>
    </>
  );
}
