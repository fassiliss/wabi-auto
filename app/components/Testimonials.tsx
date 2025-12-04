'use client';
import { useEffect, useState } from 'react';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company?: string;
  rating: number;
  testimonial: string;
  imageUrl: string;
  featured: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const getAvatarUrl = (name: string, imageUrl: string) => {
    if (!imageUrl || imageUrl.includes('default-avatar') || imageUrl.includes('/images/testimonials/')) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
    }
    if (imageUrl.includes('ui-avatars.com') || imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200`;
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="te-py-120" style={{ background: '#f8f9fa' }}>
      <div className="container">
        <div className="te-section-title-wrapper text-center" style={{ marginBottom: '50px' }}>
          <span className="short-title">Testimonials</span>
          <h2 className="title">What Our Customers Say</h2>
          <p className="desc" style={{ maxWidth: '600px', margin: '15px auto 0' }}>
            Don&apos;t just take our word for it - hear what our satisfied customers have to say
          </p>
        </div>

        <div className="row gy-4">
          {testimonials.map((testimonial) => {
            const avatarUrl = getAvatarUrl(testimonial.name, testimonial.imageUrl);
            return (
              <div key={testimonial._id} className="col-lg-4 col-md-6">
                <div style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className="fa-solid fa-star"
                        style={{
                          color: star <= testimonial.rating ? '#fbbf24' : '#e5e7eb',
                          fontSize: '18px',
                          marginRight: '4px',
                        }}
                      />
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
                        src={avatarUrl}
                        alt={testimonial.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                      {testimonial.featured && (
                        <div style={{
                          position: 'absolute',
                          bottom: '-5px',
                          right: '-5px',
                          width: '24px',
                          height: '24px',
                          background: '#2563eb',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid white',
                        }}>
                          <span style={{ fontSize: '12px' }}>⭐</span>
                        </div>
                      )}
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
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="/testimonials" className="view-all-btn">
            View All Testimonials
          </a>
        </div>
      </div>

      <style jsx>{`
        .dark section {
          background: #050505 !important;
        }
        .dark div[style*="background: white"] {
          background: #0f0f0f !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
          border: 1px solid #222 !important;
        }
        .dark h2, .dark h4 {
          color: #ffffff !important;
        }
        .dark p {
          color: #d1d5db !important;
        }
        .view-all-btn {
          display: inline-block;
          padding: 14px 32px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .view-all-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </section>
  );
}
