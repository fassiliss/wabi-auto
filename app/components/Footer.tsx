export default function Footer() {
    return (
        <footer
            className="te-footer-area te-pt-120 te-pb-60"
            style={{
                backgroundImage: "url('/images/section-bg/footer-bg-one.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container">
                <div className="row gy-5">

                    {/* ===== Column 1 — Logo & About ===== */}
                    <div className="col-lg-4 col-md-6">
                        <div className="te-footer-widget">
                            <div className="footer-logo mb-3">
                                <img src="/images/logo/footer-logo-white.png" alt="Wabi Auto Logo" />
                            </div>

                            <p className="footer-desc">
                                Get the best car service, repair, and auto maintenance with quality
                                and trust you can rely on.
                            </p>
                            <div className="social-links mt-3">
                                <a href="https://www.facebook.com/wabi.auto" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://www.instagram.com/wabi_auto/" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://www.youtube.com/@wabi_auto" target="_blank" rel="noopener noreferrer">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ===== Column 2 — Quick Links ===== */}
                    <div className="col-lg-2 col-md-6">
                        <div className="te-footer-widget">
                            <h4 className="te-footer-title">Quick Links</h4>
                            <ul className="te-footer-list">
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/services">Our Services</a></li>
                                <li><a href="/projects">Projects</a></li>
                                <li><a href="/team">Team</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* ===== Column 3 — Services ===== */}
                    <div className="col-lg-3 col-md-6">
                        <div className="te-footer-widget">
                            <h4 className="te-footer-title">Our Services</h4>
                            <ul className="te-footer-list">
                                <li><a href="/services/engine-diagnostics">Engine Diagnostics</a></li>
                                <li><a href="/services/suspension-tuning">Suspension Tuning</a></li>
                                <li><a href="/services/transmission-service">Transmission Service</a></li>
                                <li><a href="/services/oil-change">Oil Change</a></li>
                                <li><a href="/services/brake-repair">Brake Repair</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* ===== Column 4 — Contact Info ===== */}
                    <div className="col-lg-3 col-md-6">
                        <div className="te-footer-widget">
                            <h4 className="te-footer-title">Contact Info</h4>

                            <ul className="te-footer-contact-list">
                                <li><i className="fa-solid fa-map-marker-alt"></i> 6391 Elgin St. Celina, Delaware 10299</li>
                                <li><i className="fa-solid fa-phone"></i> (307) 555-0133</li>
                                <li><i className="fa-solid fa-envelope"></i> info@example.com</li>
                                <li><i className="fa-solid fa-clock"></i> Sunday - Friday: 9am - 8pm</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* ===== Bottom Footer ===== */}
                <div className="te-footer-bottom mt-60 pt-4 border-top text-center">
                    <p>
                        © 2025 Wabi Auto. All Rights Reserved.
                        <br />
                        <a href="/privacy-policy">Privacy Policy</a> &nbsp; | &nbsp;
                        <a href="/terms">Terms & Conditions</a> &nbsp; | &nbsp;
                        <a href="/support">Support</a>
                        <br />
                        <br />
                        Developed by <a href="https://www.fassiltsegaye.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>www.fassiltsegaye.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
