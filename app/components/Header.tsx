'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-area ${isSticky ? 'is-sticky' : ''}`}>
      {/* Header Top */}
      <div className="header-top">
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
                <span>
                  <i className="fa-solid fa-clock"></i> Sunday - Friday: 9 am - 8 pm
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="te-header-social" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                
                {/* Admin Button */}
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

                {/* Theme Toggle */}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Menu */}
      <div className="te-header-menu-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <div className="te-site-logo">
                <a href="/">
                  <h2 style={{ margin: 0, color: '#ff4646', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-car" style={{ marginRight: '10px' }}></i>
                    Automec
                  </h2>
                </a>
              </div>
            </div>
            <div className="col-lg-10 col-6">
              <nav className="te-main-menu">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li className="has-submenu">
                    <a href="/services">Services</a>
                    <ul className="submenu">
                      <li><a href="/services">All Services</a></li>
                      <li><a href="/services">Engine Diagnostics</a></li>
                      <li><a href="/services">Suspension Tuning</a></li>
                      <li><a href="/services">Transmission Service</a></li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="/projects">Projects</a>
                    <ul className="submenu">
                      <li><a href="/projects">All Projects</a></li>
                      <li><a href="/projects">Recent Work</a></li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="/blog">Blog</a>
                    <ul className="submenu">
                      <li><a href="/blog">All Posts</a></li>
                      <li><a href="/blog">Auto News</a></li>
                    </ul>
                  </li>
                  <li><a href="/testimonials">Testimonials</a></li>
                  <li className="has-submenu">
                    <a href="/team">Team</a>
                    <ul className="submenu">
                      <li><a href="/team">Our Team</a></li>
                      <li><a href="/team">Careers</a></li>
                    </ul>
                  </li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
