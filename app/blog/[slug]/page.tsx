import { notFound } from 'next/navigation';
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
  published: boolean;
  createdAt: string;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, {
      cache: 'no-store',
    });
    const data = await res.json();
    
    if (data.success) {
      post = data.data.find((p: BlogPost) => p.slug === slug);
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    notFound();
  }

  // Increment view count
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await fetch(`${baseUrl}/api/blog/${post._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ incrementViews: true }),
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 0',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '36px' }}>{post.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '16px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>
                Blog
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>
              <span style={{ color: 'white', fontWeight: '600' }}>{post.title}</span>
            </div>
          </div>
        </div>
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
        .dark article {
          background: #1a1a1a !important;
        }

        .dark h1, .dark p, .dark span {
          color: #e5e5e5 !important;
        }

        .dark div[style*="background: #f8f9fa"] {
          background: #2a2a2a !important;
        }

        .dark div[style*="color: #333"] p {
          color: #e5e5e5 !important;
        }
      `}</style>
    </>
  );
}
