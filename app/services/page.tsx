'use client';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

export default function ServicesPage() {
  const services = [
    {
      id: 'engine-diagnostics',
      title: 'Engine Diagnostics',
      icon: 'fa-solid fa-car-burst',
      description: 'Complete engine diagnostic services using state-of-the-art equipment. We identify issues quickly and provide detailed reports on engine health, performance, and recommended repairs.',
      features: [
        'Computer diagnostics',
        'Check engine light diagnosis',
        'Performance testing',
        'Emission testing',
        'Engine health report',
      ],
    },
    {
      id: 'suspension-tuning',
      title: 'Suspension Tuning',
      icon: 'fa-solid fa-car-side',
      description: 'Professional suspension tuning and repair services to ensure your vehicle handles smoothly and safely on any road condition.',
      features: [
        'Shock and strut replacement',
        'Spring replacement',
        'Alignment services',
        'Ride height adjustment',
        'Performance upgrades',
      ],
    },
    {
      id: 'transmission-service',
      title: 'Transmission Service',
      icon: 'fa-solid fa-gears',
      description: 'Expert transmission maintenance and repair services to keep your vehicle shifting smoothly and running efficiently.',
      features: [
        'Transmission fluid change',
        'Transmission flush',
        'Filter replacement',
        'Leak repair',
        'Complete rebuilds',
      ],
    },
    {
      id: 'oil-change',
      title: 'Oil Change',
      icon: 'fa-solid fa-oil-can',
      description: 'Quick and professional oil change services using premium oils and filters to keep your engine running at peak performance.',
      features: [
        'Conventional oil change',
        'Synthetic oil change',
        'Oil filter replacement',
        'Fluid level check',
        'Multi-point inspection',
      ],
    },
    {
      id: 'brake-repair',
      title: 'Brake Repair',
      icon: 'fa-solid fa-circle-stop',
      description: 'Complete brake system inspection, maintenance, and repair services to ensure your safety on the road.',
      features: [
        'Brake pad replacement',
        'Rotor resurfacing/replacement',
        'Brake fluid flush',
        'Caliper service',
        'ABS diagnostics',
      ],
    },
  ];

  return (
    <>
      <div style={{ marginTop: '140px' }}><PageBanner 
        title="Our Services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' }
        ]}
      />

      <section className="te-py-120">
        <div className="container">
          <div className="te-section-title-wrapper text-center" style={{ marginBottom: '50px' }}>
            <span className="short-title">What We Offer</span>
            <h2 className="title">Professional Auto Services</h2>
            <p className="desc" style={{ maxWidth: '600px', margin: '15px auto 0' }}>
              Expert automotive repair and maintenance services you can trust
            </p>
          </div>

          <div className="row gy-4">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="col-lg-6" style={{ scrollMarginTop: '100px' }}>
                <div className="service-card">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '20px',
                    }}>
                      <i className={service.icon} style={{ fontSize: '24px', color: 'white' }}></i>
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                  
                  <p className="service-description">
                    {service.description}
                  </p>
                  
                  <h4 className="features-title">
                    What&apos;s Included:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <i className="fa-solid fa-check" style={{ 
                          color: '#2563eb', 
                          marginRight: '10px',
                          fontSize: '14px',
                        }}></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div style={{ marginTop: '25px' }}>
                    <a
                      href="/booking"
                      className="service-btn"
                    >
                      Book This Service
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div><Footer />

      <style jsx>{`
        .service-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          height: 100%;
        }

        .dark .service-card {
          background: #0f0f0f !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
          border: 1px solid #222 !important;
        }

        .service-title {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .dark .service-title {
          color: #ffffff !important;
        }

        .service-description {
          color: #666;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .dark .service-description {
          color: #d1d5db !important;
        }

        .features-title {
          font-size: 18px;
          color: #333;
          margin-bottom: 15px;
        }

        .dark .features-title {
          color: #ffffff !important;
        }

        .feature-item {
          padding: 8px 0;
          color: #666;
          display: flex;
          align-items: center;
        }

        .dark .feature-item {
          color: #d1d5db !important;
        }

        .service-btn {
          display: inline-block;
          padding: 12px 30px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .service-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .dark h1, .dark h2 {
          color: #ffffff !important;
        }

        .dark p.desc {
          color: #d1d5db !important;
        }
      `}</style>
    </>
  );
}
