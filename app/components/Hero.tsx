'use client';
import { useState } from 'react';

export default function Hero() {
  return (
    <section 
      className="te-hero-area" 
      style={{
        marginTop: '140px', // ✅ Push down below header
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
                Et purus duis sollicitudin dignissim habitant. Egestas nulla quis venenatis cras sed Et purus duis sollicitudin dignissim habitant. Egestas
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
  );
}
