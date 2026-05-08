'use client';
import { useState } from 'react';

const WORK_VIDEO_URL = 'https://www.youtube.com/embed/WtM-Xo36xfw?autoplay=1&rel=0';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section 
        className="te-hero-area" 
        style={{
          marginTop: '140px',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/slider/wabi2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="te-hero-content">
                <span className="short-title" style={{ color: '#60a5fa', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  CAR REPAIR
                </span>
                <h1 className="hero-title" style={{
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '20px 0',
                  lineHeight: '1.2',
                }}>
                  Mastering the Art of Auto Repair
                </h1>
                <p className="hero-desc" style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  color: '#e5e7eb',
                  marginBottom: '40px',
                  maxWidth: '600px',
                }}>
                  From diagnostics to repairs, we inspect your vehicle carefully, explain what we find, and get you back on the road with honest service you can trust.
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-block',
                      padding: '16px 35px',
                      background: '#2563eb',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    CONTACT NOW →
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 30px',
                      background: 'transparent',
                      border: '2px solid white',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{
                      width: '40px',
                      height: '40px',
                      background: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb',
                    }}>
                      ▶
                    </span>
                    HOW WE WORK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How we work video"
          onClick={() => setIsVideoOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(960px, 100%)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setIsVideoOpen(false)}
              style={{
                position: 'absolute',
                top: '-46px',
                right: 0,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
            }}>
              <iframe
                src={WORK_VIDEO_URL}
                title="How we work auto repair video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
