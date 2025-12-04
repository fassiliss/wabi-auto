'use client';

interface PageBannerProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  backgroundImage?: string; // Optional: override default image
}

export default function PageBanner({ title, breadcrumbs, backgroundImage }: PageBannerProps) {
  // Use booking banner as default, or custom image if provided
  const defaultImage = '/images/booking-banner.png';
  const imageToUse = backgroundImage || defaultImage;
  
  const bgStyle = `linear-gradient(rgba(102, 126, 234, 0.75), rgba(118, 75, 162, 0.75)), url(${imageToUse})`;

  return (
    <div
      style={{
        background: bgStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center' }}>
          {/* Title */}
          <h1 style={{ 
            color: 'white', 
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '-0.5px',
          }}>
            {title}
          </h1>

          {/* Breadcrumb Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
            flexWrap: 'wrap',
          }}>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {crumb.href ? (
                  <a 
                    href={crumb.href}
                    className="breadcrumb-link"
                    style={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span style={{ 
                    color: 'white', 
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <i className="fa-solid fa-chevron-right" style={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px',
                  }}></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .breadcrumb-link {
          transition: all 0.3s ease;
        }

        .breadcrumb-link:hover {
          background: rgba(255,255,255,0.3) !important;
        }
      `}</style>
    </div>
  );
}
