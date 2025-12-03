'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header-area ${isSticky ? 'is-sticky' : ''}`}>
      <div className="header-top" style={{ display: 'none' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="te-header-contact-info">
                <span>
                  <i className="fa-solid fa-envelope"></i> info@example.com
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i> 6391 Elgin Rt.Mirpur, 10299
                </span>
                {/*<span>*/}
                {/*  <i className="fa-solid fa-clock"></i> Sunday - Friday: 9 am - 8 pm*/}
                {/*</span>*/}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="te-header-social" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                
                <a 
                  href="/admin"
                  className="admin-icon-btn"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#667eea',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    marginLeft: '5px',
                  }}
                  title="Admin Dashboard"
                >
                  <i className="fa-solid fa-lock" style={{ fontSize: '14px' }}></i>
                </a>

                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="te-header-menu-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-lg-2">
              <div className="te-site-logo">
                <a href="/">
                  <h2 style={{ margin: 0, color: '#ff4646', fontWeight: 'bold', fontSize: 'clamp(18px, 4vw, 24px)' }}>
                    <i className="fa-solid fa-car" style={{ marginRight: '8px' }}></i>
                    Wabi Automotive
                  </h2>
                </a>
              </div>
            </div>
            
            <div className="col-6 col-lg-10">
              <nav className="te-main-menu desktop-menu">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/testimonials">Testimonials</a></li>
                  <li><a href="/booking" style={{ color: '#2563eb', fontWeight: '600' }}>Book Service</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </nav>

              <div className="mobile-menu-toggle">
                <ThemeToggle />
                <button 
                  onClick={toggleMobileMenu}
                  className="hamburger-btn"
                  aria-label="Toggle menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#333',
                    marginLeft: '15px',
                  }}
                >
                  <i className={isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <nav>
              <ul>
                <li><a href="/" onClick={toggleMobileMenu}>Home</a></li>
                <li><a href="/about" onClick={toggleMobileMenu}>About Us</a></li>
                <li><a href="/services" onClick={toggleMobileMenu}>Services</a></li>
                <li><a href="/blog" onClick={toggleMobileMenu}>Blog</a></li>
                <li><a href="/testimonials" onClick={toggleMobileMenu}>Testimonials</a></li>
                <li><a href="/booking" onClick={toggleMobileMenu}><i className="fa-solid fa-calendar"></i> Book Service</a></li>
                <li><a href="/contact" onClick={toggleMobileMenu}>Contact</a></li>
                <li><a href="/admin" onClick={toggleMobileMenu}><i className="fa-solid fa-lock"></i> Admin</a></li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        .desktop-menu {
          display: none;
        }

        @media (min-width: 992px) {
          .desktop-menu {
            display: block;
          }

          .mobile-menu-toggle {
            display: none !important;
          }

          .header-top {
            display: block !important;
          }
        }

        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .dark .hamburger-btn {
          color: #ffffff;
        }

        .mobile-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .dark .mobile-menu-dropdown {
          background: #1a1a1a;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-dropdown nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu-dropdown nav ul li {
          border-bottom: 1px solid #e5e7eb;
        }

        .dark .mobile-menu-dropdown nav ul li {
          border-bottom-color: #333;
        }

        .mobile-menu-dropdown nav ul li a {
          display: block;
          padding: 15px 20px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .dark .mobile-menu-dropdown nav ul li a {
          color: #ffffff;
        }

        .mobile-menu-dropdown nav ul li a:hover {
          background: #f3f4f6;
        }

        .dark .mobile-menu-dropdown nav ul li a:hover {
          background: #2a2a2a;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
