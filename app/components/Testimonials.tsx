'use client';
import { useEffect, useState } from 'react';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  testimonial: string;
  imageUrl: string;
  featured: boolean;
}

export default function Testimonials() {
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
        // Show featured testimonials first
        const sorted = data.data.sort((a: Testimonial, b: Testimonial) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setTestimonials(sorted);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
    setLoading(false);
  };

  const getAvatarUrl = (testimonial: Testimonial) => {
    if (testimonial.imageUrl && !testimonial.imageUrl.includes('default-avatar')) {
      return testimonial.imageUrl;
    }
    // Generate avatar from name using UI Avatars
    const name = encodeURIComponent(testimonial.name);
    return `https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff&size=200`;
  };

  if (loading) {
    return (
      <section className="te-py-120" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <>
      <section className="testimonials-section te-py-120">
        <div className="container">
          {/* Section Title */}
          <div className="te-section-title-wrapper text-center" style={{ marginBottom: '50px' }}>
            <span className="short-title">Testimonials</span>
            <h2 className="title">What Our Customers Say</h2>
            <p className="desc" style={{ maxWidth: '600px', margin: '15px auto 0' }}>
              Don't just take our word for it - hear from our satisfied customers about their experience with Wabi Auto
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="row gy-4">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div key={testimonial._id} className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  {/* Rating */}
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} style={{ 
                        color: index < testimonial.rating ? '#fbbf24' : '#e5e7eb',
                        fontSize: '18px',
                      }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="testimonial-text">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Customer Info */}
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img 
                        src={getAvatarUrl(testimonial)} 
                        alt={testimonial.name}
                      />
                      {testimonial.featured && (
                        <span className="featured-badge">⭐</span>
                      )}
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-position">
                        {testimonial.position}
                        {testimonial.company && ` - ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a 
              href="/contact" 
              className="te-theme-btn"
              style={{
                display: 'inline-block',
                padding: '15px 35px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .testimonials-section {
          background: #f8f9fa;
        }

        .dark .testimonials-section {
          background: #0a0a0a;
        }

        .testimonial-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dark .testimonial-card {
          background: #1a1a1a;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .dark .testimonial-card:hover {
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
        }

        .testimonial-rating {
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 15px;
          line-height: 1.7;
          color: #555;
          margin-bottom: 25px;
          flex: 1;
          font-style: italic;
        }

        .dark .testimonial-text {
          color: #d1d5db;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 15px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .dark .testimonial-author {
          border-top-color: #333;
        }

        .author-image {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .author-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: #2563eb;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          border: 2px solid white;
        }

        .dark .featured-badge {
          border-color: #1a1a1a;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }

        .dark .author-name {
          color: #ffffff;
        }

        .author-position {
          margin: 3px 0 0;
          font-size: 13px;
          color: #666;
        }

        .dark .author-position {
          color: #999;
        }

        .te-section-title-wrapper .short-title {
          color: #2563eb;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .dark .te-section-title-wrapper .short-title {
          color: #60a5fa;
        }

        .te-section-title-wrapper .title {
          font-size: 36px;
          font-weight: 700;
          margin: 10px 0;
          color: #333;
        }

        .dark .te-section-title-wrapper .title {
          color: #ffffff;
        }

        .te-section-title-wrapper .desc {
          color: #666;
          font-size: 16px;
          line-height: 1.6;
        }

        .dark .te-section-title-wrapper .desc {
          color: #d1d5db;
        }

        .te-theme-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .te-section-title-wrapper .title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}
