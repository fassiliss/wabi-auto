'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../components/Footer';
import PageBanner from '../../components/PageBanner';

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
  published: boolean;
  createdAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      
      if (data.success) {
        const foundPost = data.data.find((p: BlogPost) => p.slug === slug);
        setPost(foundPost || null);
        
        if (foundPost) {
          await fetch(`/api/blog/${foundPost._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ incrementViews: true }),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <div style={{ marginTop: '140px' }}>
          <PageBanner 
            title="Loading..."
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
        </div>
        <section className="te-py-120">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p>Loading post...</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <div style={{ marginTop: '140px' }}>
          <PageBanner 
            title="Post Not Found"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
        </div>
        <section className="te-py-120">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#666' }}>Blog post not found</h3>
              <Link href="/blog" style={{ color: '#2563eb' }}>← Back to Blog</Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div style={{ marginTop: '140px' }}>
        <PageBanner 
          title={post.title}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      <section className="te-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <article style={{
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}>
                  {post.category}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                }}>
                  <span><i className="fa-solid fa-user"></i> {post.author}</span>
                  <span><i className="fa-solid fa-calendar"></i> {formattedDate}</span>
                  <span><i className="fa-solid fa-eye"></i> {post.views} views</span>
                </div>

                {post.imageUrl && post.imageUrl !== '/images/blog/default-blog.jpg' && (
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
                )}

                <div style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderLeft: '4px solid #2563eb',
                  marginBottom: '30px',
                  borderRadius: '8px',
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#333',
                  }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333',
                }}>
                  {post.content.split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && (
                      <p key={index} style={{ marginBottom: '20px' }}>
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
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
        .dark article {
          background: #0f0f0f !important;
          border: 1px solid #222 !important;
        }

        .dark h1, .dark p, .dark span {
          color: #e5e5e5 !important;
        }

        .dark div[style*="background: #f8f9fa"] {
          background: #1a1a1a !important;
        }

        .dark div[style*="color: #333"] p {
          color: #e5e5e5 !important;
        }
      `}</style>
    </>
  );
}
