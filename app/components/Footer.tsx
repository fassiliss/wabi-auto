import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="te-footer-area te-dark-bg">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="te-footer-widget">
              <h3 className="te-footer-widget-title" style={{ color: '#ff4646', fontWeight: 'bold' }}>
                <i className="fa-solid fa-car" style={{ marginRight: '10px' }}></i>
                Wabi Automotive
              </h3>
              <p className="te-footer-widget-desc">
                Get the best car service, repair, and auto maintenance with quality and trust you can rely on.
              </p>
              <div className="te-footer-social">
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <div className="te-footer-widget">
              <h3 className="te-footer-widget-title">Quick Links</h3>
              <ul className="te-footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Our Services</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Our Services - Updated with Anchor Links */}
          <div className="col-lg-3 col-md-6">
            <div className="te-footer-widget">
              <h3 className="te-footer-widget-title">Our Services</h3>
              <ul className="te-footer-links">
                <li><Link href="/services#engine-diagnostics">Engine Diagnostics</Link></li>
                <li><Link href="/services#suspension-tuning">Suspension Tuning</Link></li>
                <li><Link href="/services#transmission-service">Transmission Service</Link></li>
                <li><Link href="/services#oil-change">Oil Change</Link></li>
                <li><Link href="/services#brake-repair">Brake Repair</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <div className="te-footer-widget">
              <h3 className="te-footer-widget-title">Contact Info</h3>
              <ul className="te-footer-contact">
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  2401 Dickerson Pike, Nashville, TN 37207
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  (615) 582-3291
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  info@example.com
                </li>
                <li>
                  <i className="fa-solid fa-clock"></i>
                  Sunday - Friday: 9am - 8pm
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="te-footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="te-copyright-text">
                © 2025 Wabi Auto. All Rights Reserved. 
                <a href="#" style={{ marginLeft: '10px' }}>Privacy Policy</a> | 
                <a href="#" style={{ marginLeft: '5px' }}>Terms & Conditions</a> | 
                <a href="#" style={{ marginLeft: '5px' }}>Support</a>
              </p>
            </div>
            <div className="col-md-6 text-end">
              <p className="te-copyright-text">
                Developed by <a href="https://www.fassiltsegaye.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: '600' }}>www.fassiltsegaye.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
