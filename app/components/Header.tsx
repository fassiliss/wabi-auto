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
                <span><i className="fa-solid fa-envelope"></i> info@example.com</span>
                <span><i className="fa-solid fa-location-dot"></i> 6391 Elgin Rt.Mirpur, 10299</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header-right">
                <Link href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></Link>
                <Link href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></Link>
                <Link href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></Link>
                <Link href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></Link>
                <Link href="/admin" className="admin-btn" title="Admin Dashboard">
                  <i className="fa-solid fa-lock"></i>
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
                <i className="fa-solid fa-car"></i>
                <span>Wabi<br/>Automotive</span>
              </Link>
            </div>
            <div className="col-6 col-lg-10">
              <nav className="main-nav">
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/testimonials">Testimonials</Link></li>
                  <li><Link href="/booking" className="book-service">Book Service</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
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
              <li><Link href="/" onClick={toggleMobileMenu}>Home</Link></li>
              <li><Link href="/about" onClick={toggleMobileMenu}>About Us</Link></li>
              <li><Link href="/services" onClick={toggleMobileMenu}>Services</Link></li>
              <li><Link href="/blog" onClick={toggleMobileMenu}>Blog</Link></li>
              <li><Link href="/testimonials" onClick={toggleMobileMenu}>Testimonials</Link></li>
              <li><Link href="/booking" onClick={toggleMobileMenu}><i className="fa-solid fa-calendar"></i> Book Service</Link></li>
              <li><Link href="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
              <li><Link href="/admin" onClick={toggleMobileMenu}><i className="fa-solid fa-lock"></i> Admin</Link></li>
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
        }

        .header-top {
          background: #1a1a1a;
          padding: 10px 0;
          font-size: 13px;
        }

        .header-contact {
          display: flex;
          gap: 20px;
          color: white;
        }

        .header-contact span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header-contact i {
          color: #dc2626;
        }

        .header-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }

        .header-right a {
          color: white;
          font-size: 14px;
          transition: color 0.3s;
        }

        .header-right a:hover {
          color: #2563eb;
        }

        .admin-btn {
          width: 28px;
          height: 28px;
          background: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .admin-btn:hover {
          background: #764ba2;
          transform: scale(1.1);
        }

        .header-main {
          background: transparent;
          padding: 15px 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #dc2626;
        }

        .logo i {
          font-size: 28px;
        }

        .logo span {
          font-size: 20px;
          font-weight: bold;
          line-height: 1.2;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .main-nav {
          display: none;
        }

        .main-nav ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 30px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .main-nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.3s;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }

        .main-nav a:hover {
          color: #60a5fa;
        }

        .book-service {
          color: #60a5fa !important;
          font-weight: 600 !important;
        }

        .mobile-menu-btn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 15px;
        }

        .mobile-menu-btn button {
          background: none;
          border: none;
          font-size: 24px;
          color: white;
          cursor: pointer;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }

        .mobile-menu {
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 10px 0;
        }

        .mobile-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu li {
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-menu a {
          display: block;
          padding: 12px 20px;
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .mobile-menu a:hover {
          background: rgba(255,255,255,0.1);
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
        }
      `}</style>
    </header>
  );
}
