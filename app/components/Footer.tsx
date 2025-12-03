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
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Our Services</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/testimonials">Testimonials</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Our Services - Updated with Anchor Links */}
          <div className="col-lg-3 col-md-6">
            <div className="te-footer-widget">
              <h3 className="te-footer-widget-title">Our Services</h3>
              <ul className="te-footer-links">
                <li><a href="/services#engine-diagnostics">Engine Diagnostics</a></li>
                <li><a href="/services#suspension-tuning">Suspension Tuning</a></li>
                <li><a href="/services#transmission-service">Transmission Service</a></li>
                <li><a href="/services#oil-change">Oil Change</a></li>
                <li><a href="/services#brake-repair">Brake Repair</a></li>
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
                  6391 Elgin St. Celina, Delaware 10299
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  (307) 555-0133
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
