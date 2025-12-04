'use client';
import { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company?: string;
  rating: number;
  testimonial: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
    setLoading(false);
  };

  const getAvatarUrl = (name: string, imageUrl: string) => {
    // Always use UI Avatars - ignore problematic local paths
    if (!imageUrl || 
        imageUrl.includes('default-avatar') || 
        imageUrl.includes('/images/testimonials/') ||
        imageUrl === '') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
    }
    // If it's already a UI Avatars URL or valid external URL, use it
    if (imageUrl.includes('ui-avatars.com') || imageUrl.startsWith('http')) {
      return imageUrl;
    }
    // Default to UI Avatar
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };

  return (
    <>
      <PageBanner 
        title="Customer Testimonials"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Testimonials' }
        ]}
      />

      <section className="te-py-120">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: '#f0f4ff',
              color: '#2563eb',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '15px',
            }}>
              What Our Customers Say
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
              Real Reviews from Real Customers
            </h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Don&apos;t just take our word for it - hear what our satisfied customers have to say about our services
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#666' }}>Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No testimonials yet</h3>
              <p style={{ color: '#999' }}>Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="row gy-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="col-lg-4 col-md-6">
                  <div style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}>
                    {testimonial.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#f59e0b',
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        ⭐ Featured
                      </div>
                    )}

                    <div style={{ marginBottom: '15px' }}>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className="fa-solid fa-star"
                          style={{
                            color: index < testimonial.rating ? '#fbbf24' : '#e5e7eb',
                            fontSize: '18px',
                            marginRight: '4px',
                          }}
                        ></i>
                      ))}
                    </div>

                    <p style={{
                      fontSize: '15px',
                      lineHeight: '1.7',
                      color: '#666',
                      fontStyle: 'italic',
                      marginBottom: '25px',
                      flex: 1,
                    }}>
                      &quot;{testimonial.testimonial}&quot;
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={getAvatarUrl(testimonial.name, testimonial.imageUrl)}
                          alt={testimonial.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '16px', 
                          fontWeight: '600', 
                          color: '#333',
                          marginBottom: '5px',
                        }}>
                          {testimonial.name}
                        </h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                          {testimonial.position}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '50px 30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
          }}>
            <h3 style={{ color: 'white', fontSize: '28px', marginBottom: '15px' }}>
              Ready to Experience Our Service?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '25px' }}>
              Join our satisfied customers and book your service today
            </p>
            <a
              href="/booking"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: 'white',
                color: '#2563eb',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              Book Your Service
            </a>
          </div>
        </div>
      </section>

      <Footer />

        <style jsx>{`
            .dark h1, .dark h2, .dark h3, .dark h4 {
                color: #ffffff !important;
            }

            .dark p, .dark li {
                color: #d1d5db !important;
            }

            .dark div[style*="background: white"] {
                background: #0f0f0f !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
                border: 1px solid #222 !important;
            }
        `}</style>
    </>
  );
}
