import Footer from "../components/Footer";

export default function AboutPage() {
    return (
        <>
            {/* Page Banner / Breadcrumb */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">About Wabi Auto</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="active">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className="te-about-area te-py-120">
                <div className="container">
                    <div className="row gy-4 align-items-center">
                        {/* Left: Image */}
                        <div className="col-lg-6">
                            <div className="te-about-image-wrapper">
                                <div className="te-about-main-image">
                                    <img
                                        src="/images/about/aboutwabiauto.png"
                                        alt="About Wabi Auto"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="col-lg-6">
                            <div className="te-about-content-wrapper">
                                <span className="short-title">ABOUT WABI AUTO</span>
                                <h2 className="title">
                                    Expert Car Service &amp; Repair You Can Rely On
                                </h2>
                                <p className="desc">
                                    At Wabi Auto, we specialize in complete car care – from
                                    diagnostics and engine repair to brakes, suspension, and
                                    regular maintenance. Our mission is to keep you safe on the
                                    road with honest, high-quality service.
                                </p>

                                <p className="desc">
                                    With skilled technicians, modern equipment, and a focus on
                                    customer satisfaction, we treat every vehicle like it&apos;s
                                    our own. Whether it&apos;s a quick oil change or a complex
                                    repair, we deliver transparent work and clear communication.
                                </p>

                                <div className="te-about-feature-list">
                                    <div className="single-feature">
                                        <i className="fa-solid fa-check"></i>
                                        <span>Certified &amp; experienced technicians</span>
                                    </div>
                                    <div className="single-feature">
                                        <i className="fa-solid fa-check"></i>
                                        <span>Modern diagnostics &amp; repair tools</span>
                                    </div>
                                    <div className="single-feature">
                                        <i className="fa-solid fa-check"></i>
                                        <span>Honest pricing &amp; trusted service</span>
                                    </div>
                                </div>

                                <div className="te-about-cta">
                                    <a href="/contact" className="te-theme-btn">
                                        BOOK AN APPOINTMENT{" "}
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Row with background */}
            <section
                className="te-py-120 te-counter-section"
                style={{
                    backgroundImage: "url('/images/about/wabiexperiance.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container">
                    <div className="row gy-4 text-center">
                        <div className="col-md-4">
                            <div className="te-counter-card">
                                <h3 className="title">10+</h3>
                                <p className="sub-title">Years of Experience</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="te-counter-card">
                                <h3 className="title">2K+</h3>
                                <p className="sub-title">Vehicles Serviced</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="te-counter-card">
                                <h3 className="title">4.9★</h3>
                                <p className="sub-title">Customer Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
