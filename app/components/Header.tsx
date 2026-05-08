'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-area">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="header-contact">
                <span><i className="fa-solid fa-phone"></i> (615) 582-3291</span>
                <span><i className="fa-solid fa-location-dot"></i> 2401 Dickerson Pike, Nashville</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header-right">
                <Link href="/contact" className="top-link">
                  <i className="fa-solid fa-message"></i>
                  <span className="top-label">CONTACT</span>
                </Link>
                <Link href="/admin" className="top-link admin-btn" title="Admin Dashboard">
                  <i className="fa-solid fa-user-shield"></i>
                  <span className="top-label">ADMIN</span>
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Always Transparent */}
      <div className="header-main">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-lg-2">
              <Link href="/" className="logo">
                <span className="logo-mark" aria-hidden="true">
                  <span className="logo-letter">W</span>
                  <i className="fa-solid fa-wrench"></i>
                </span>
                <span className="logo-text">
                  <strong>Wabi</strong>
                  <small>Automotive</small>
                </span>
              </Link>
            </div>
            <div className="col-6 col-lg-10 header-nav-column">
              <nav className="main-nav">
                <ul>
                  <li><Link href="/"><span className="nav-label">HOME</span></Link></li>
                  <li><Link href="/about"><span className="nav-label">ABOUT US</span></Link></li>
                  <li><Link href="/services"><span className="nav-label">SERVICES</span></Link></li>
                  <li><Link href="/blog"><span className="nav-label">BLOG</span></Link></li>
                  <li><Link href="/testimonials"><span className="nav-label">TESTIMONIALS</span></Link></li>
                  <li><Link href="/booking" className="book-service"><i className="fa-solid fa-calendar-check"></i> <span className="nav-label">BOOK SERVICE</span></Link></li>
                </ul>
              </nav>

              <div className="mobile-menu-btn">
                <ThemeToggle />
                <button onClick={toggleMobileMenu} aria-label="Toggle menu">
                  <i className={isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><Link href="/" onClick={toggleMobileMenu}><span className="mobile-nav-label">HOME</span></Link></li>
              <li><Link href="/about" onClick={toggleMobileMenu}><span className="mobile-nav-label">ABOUT US</span></Link></li>
              <li><Link href="/services" onClick={toggleMobileMenu}><span className="mobile-nav-label">SERVICES</span></Link></li>
              <li><Link href="/blog" onClick={toggleMobileMenu}><span className="mobile-nav-label">BLOG</span></Link></li>
              <li><Link href="/testimonials" onClick={toggleMobileMenu}><span className="mobile-nav-label">TESTIMONIALS</span></Link></li>
              <li><Link href="/booking" onClick={toggleMobileMenu}><i className="fa-solid fa-calendar"></i> <span className="mobile-nav-label">BOOK SERVICE</span></Link></li>
              <li><Link href="/contact" onClick={toggleMobileMenu}><span className="mobile-nav-label">CONTACT</span></Link></li>
              <li><Link href="/admin" onClick={toggleMobileMenu}><i className="fa-solid fa-lock"></i> <span className="mobile-nav-label">ADMIN</span></Link></li>
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .header-area {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .header-area a,
        .header-area a:hover,
        .header-area a:focus,
        .header-area a:active {
          border-bottom: 0 !important;
          box-shadow: none !important;
          text-decoration: none !important;
        }

        .header-area a::after,
        .header-area a::before {
          display: none !important;
        }

        .header-top {
          background: #090d14;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 0;
          font-size: 12px;
        }

        .header-contact {
          display: flex;
          gap: 22px;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 950;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .header-contact span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header-contact i {
          color: #ef4444;
        }

        .header-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }

        .header-right a {
          transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .header-right a:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .top-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.86);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.05em;
          text-decoration: none;
          text-transform: uppercase;
        }

        .top-label {
          color: rgba(255, 255, 255, 0.86) !important;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.05em;
          line-height: 1;
          text-decoration: none !important;
        }

        .admin-btn {
          background: rgba(239, 68, 68, 0.18);
          color: #ffffff !important;
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 999px;
          padding: 7px 12px;
          transition: all 0.2s ease;
        }

        .admin-btn:hover {
          background: #ef4444;
          color: #ffffff !important;
          transform: scale(1.1);
        }

        .header-main {
          background: rgba(11, 16, 25, 0.86);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(18px);
          padding: 12px 0;
        }

        .header-nav-column {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #ffffff;
          min-width: 190px;
        }

        .logo-mark {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 58%, #111827 100%);
          box-shadow: 0 12px 28px rgba(239, 68, 68, 0.26);
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .logo-mark::after {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 10px;
        }

        .logo-letter {
          color: #ffffff;
          font-size: 25px;
          font-weight: 950;
          line-height: 1;
          letter-spacing: 0;
        }

        .logo-mark i {
          position: absolute;
          right: 7px;
          bottom: 7px;
          color: #ffffff;
          font-size: 12px;
          transform: rotate(-18deg);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-transform: uppercase;
        }

        .logo-text strong {
          color: #ffffff;
          font-size: 27px;
          font-weight: 950;
          letter-spacing: 0;
        }

        .logo-text small {
          color: #fca5a5;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          margin-top: 4px;
        }

        .main-nav {
          display: none;
        }

        .main-nav ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .main-nav a {
          position: relative;
          color: rgba(255, 255, 255, 0.86) !important;
          text-decoration: none !important;
          font-weight: 950 !important;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          padding: 13px 15px;
          border-radius: 999px;
          text-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
        }

        .nav-label {
          color: rgba(255, 255, 255, 0.86) !important;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.05em;
          line-height: 1;
          text-transform: uppercase;
        }

        .main-nav a::after {
          display: none;
        }

        .main-nav a:hover {
          background: rgba(255, 255, 255, 0.09);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .book-service {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ef4444 !important;
          color: #ffffff !important;
          box-shadow: 0 12px 28px rgba(239, 68, 68, 0.32);
          padding: 13px 20px !important;
          font-weight: 950 !important;
        }

        .book-service::after {
          display: none;
        }

        .book-service:hover {
          background: #dc2626 !important;
        }

        .mobile-menu-btn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }

        .mobile-menu-btn button {
          background: none;
          border: none;
          font-size: 24px;
          color: white;
          cursor: pointer;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
        }

        .mobile-menu {
          background: rgba(9, 13, 20, 0.98);
          backdrop-filter: blur(18px);
          border-top: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);
          padding: 8px 0;
        }

        .mobile-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu li {
          border-bottom: 0;
        }

        .mobile-menu a {
          display: block;
          padding: 14px 22px;
          color: rgba(255, 255, 255, 0.86) !important;
          border-bottom: 0 !important;
          text-decoration: none !important;
          font-weight: 900;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .mobile-nav-label {
          color: rgba(255, 255, 255, 0.86) !important;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.05em;
          line-height: 1;
          text-decoration: none !important;
        }

        .mobile-menu a:hover {
          background: rgba(255,255,255,0.1);
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .logo {
            min-width: 170px;
          }

          .logo-text strong {
            font-size: 23px;
          }

          .main-nav a {
            font-size: 12px;
            letter-spacing: 0.05em;
            font-weight: 950 !important;
            padding: 11px 8px;
          }

          .nav-label {
            font-size: 12px;
          }

          .book-service {
            padding: 11px 12px !important;
          }
        }

        @media (min-width: 992px) {
          .main-nav {
            display: block;
          }

          .mobile-menu-btn {
            display: none;
          }

          .header-top {
            display: block;
          }
        }

        @media (max-width: 991px) {
          .header-top {
            display: none;
          }

          .header-main {
            padding: 10px 0;
          }

          .logo {
            min-width: 0;
          }

          .logo-mark {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }

          .logo-text strong {
            font-size: 22px;
          }

          .logo-text small {
            font-size: 9px;
          }
        }
      `}</style>
    </header>
  );
}
