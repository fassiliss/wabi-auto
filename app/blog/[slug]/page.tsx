'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../components/Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  views: number;
  createdAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      // Find post by slug
      const res = await fetch('/api/blog');
      const data = await res.json();
      
      if (data.success) {
        const foundPost = data.data.find((p: BlogPost) => p.slug === params.slug);
        if (foundPost) {
          setPost(foundPost);
          // Increment views
          incrementViews(foundPost._id);
        } else {
          setError('Blog post not found');
        }
      }
    } catch (err) {
      setError('Failed to load blog post');
    }
    setLoading(false);
  };

  const incrementViews = async (id: string) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incrementViews: true }),
      });
    } catch (err) {
      console.error('Failed to increment views:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <div className="te-breadcrumb-area" style={{ backgroundImage: "url('/images/section-bg/page-header.jpg')" }}>
          <div className="container">
            <div className="te-breadcrumb-content text-center">
              <h1 className="te-breadcrumb-title">Blog Post Not Found</h1>
            </div>
          </div>
        </div>
        <section className="te-py-120">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#666' }}>{error || 'Post not found'}</h3>
              <Link 
                href="/blog"
                style={{
                  marginTop: '20px',
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Page Banner */}
      <div
        className="te-breadcrumb-area"
        style={{
          backgroundImage: "url('/images/section-bg/page-header.jpg')",
        }}
      >
        <div className="container">
          <div className="te-breadcrumb-content text-center">
            <h1 className="te-breadcrumb-title">{post.title}</h1>
            <ul className="te-breadcrumb-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li className="active">{post.category}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Post Content */}
      <section className="te-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <article className="blog-post-detail">
                {/* Post Meta */}
                <div className="post-meta">
                  <span className="category-badge">{post.category}</span>
                  <div className="meta-info">
                    <span><i className="fa-solid fa-user"></i> {post.author}</span>
                    <span><i className="fa-solid fa-calendar"></i> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span><i className="fa-solid fa-eye"></i> {post.views} views</span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="post-image">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      marginBottom: '30px',
                    }}
                  />
                </div>

                {/* Post Content */}
                <div className="post-content">
                  <div className="post-excerpt">
                    {post.excerpt}
                  </div>
                  <div className="post-body">
                    {post.content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index}>{paragraph}</p>
                      )
                    ))}
                  </div>
                </div>

                {/* Back to Blog Button */}
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                  <Link 
                    href="/blog"
                    style={{
                      display: 'inline-block',
                      padding: '12px 30px',
                      background: '#2563eb',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    ← Back to Blog
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .blog-post-detail {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .dark .blog-post-detail {
          background: #1a1a1a;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
        }

        .post-meta {
          margin-bottom: 30px;
        }

        .category-badge {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .meta-info {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 14px;
          color: #666;
        }

        .dark .meta-info {
          color: #999;
        }

        .meta-info span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .post-content {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
        }

        .dark .post-content {
          color: #e5e5e5;
        }

        .post-excerpt {
          font-size: 18px;
          font-weight: 500;
          color: #555;
          margin-bottom: 25px;
          padding: 20px;
          background: #f8f9fa;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
        }

        .dark .post-excerpt {
          background: #0f0f0f;
          color: #d1d5db;
        }

        .post-body p {
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .post-body p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}
