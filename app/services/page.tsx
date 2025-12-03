'use client';

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
      <div
        className="te-breadcrumb-area"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 0',
        }}
      >
        <div className="container">
          <div className="te-breadcrumb-content text-center">
            <h1 className="te-breadcrumb-title" style={{ color: 'white' }}>Our Services</h1>
            <ul className="te-breadcrumb-list">
              <li>
                <a href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</a>
              </li>
              <li className="active" style={{ color: 'white' }}>Services</li>
            </ul>
          </div>
        </div>
      </div>

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
                <div style={{
                  background: 'white',
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  height: '100%',
                }}>
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
                    <h3 style={{ margin: 0, fontSize: '24px', color: '#333' }}>{service.title}</h3>
                  </div>
                  
                  <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
                    {service.description}
                  </p>
                  
                  <h4 style={{ fontSize: '18px', color: '#333', marginBottom: '15px' }}>What's Included:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ 
                        padding: '8px 0', 
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
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
                      Book This Service
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
          background: #1a1a1a !important;
          box-shadow: 0 2px 10px rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </>
  );
}
