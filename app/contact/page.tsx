import Footer from "../components/Footer";

export default function ContactPage() {
    return (
        <>
            {/* Breadcrumb / Page Header */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">Contact Wabi Auto</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="active">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <section className="te-py-120">
                <div className="container">
                    <div className="row gy-5">
                        {/* Left: Contact Form */}
                        <div className="col-lg-7">
                            <div className="te-section-title-wrapper mb-4">
                                <span className="short-title">Get In Touch</span>
                                <h2 className="title">We&apos;d Love to Hear From You</h2>
                                <p className="desc">
                                    Have questions about a service, need a quote, or want to book
                                    an appointment? Send us a message and we&apos;ll get back to
                                    you as soon as possible.
                                </p>
                            </div>

                            <form className="te-contact-form">
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="te-input"
                                            placeholder="Your Name*"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            className="te-input"
                                            placeholder="Your Email*"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            className="te-input"
                                            placeholder="Your Phone"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="te-input"
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="col-12">
                    <textarea
                        className="te-textarea"
                        rows={5}
                        placeholder="Write your message here..."
                        required
                    ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="te-theme-btn">
                                            SEND MESSAGE{" "}
                                            <i className="fa-solid fa-arrow-right-long" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right: Contact Info / Sidebar */}
                        <div className="col-lg-5">
                            <div className="te-contact-info-card">
                                <h3 className="mb-3">Contact Information</h3>
                                <p className="mb-4">
                                    Visit our shop, give us a call, or send us an email. We&apos;re
                                    here to help keep your vehicle running smoothly.
                                </p>

                                <ul className="te-contact-info-list mb-4">
                                    <li>
                                        <i className="fa-solid fa-location-dot"></i>
                                        <div>
                                            <h4>Our Location</h4>
                                            <p>6391 Elgin St. Celina, Delaware 10299</p>
                                        </div>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-phone"></i>
                                        <div>
                                            <h4>Phone Number</h4>
                                            <p>(307) 555-0133</p>
                                        </div>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-envelope"></i>
                                        <div>
                                            <h4>Email Address</h4>
                                            <p>info@example.com</p>
                                        </div>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-clock"></i>
                                        <div>
                                            <h4>Working Hours</h4>
                                            <p>Sunday - Friday: 9:00 am - 8:00 pm</p>
                                        </div>
                                    </li>
                                </ul>

                                <div className="te-contact-help-box">
                                    <h4>Need urgent help?</h4>
                                    <p className="mb-2">
                                        Call us directly and our team will assist you with towing,
                                        emergency repairs, or quick diagnostics.
                                    </p>
                                    <a href="tel:13075550133" className="te-theme-btn style-2">
                                        CALL NOW <i className="fa-solid fa-phone"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional Map Section */}
                    <div className="row te-pt-120">
                        <div className="col-12">
                            <div className="te-map-wrapper">
                                {/* You can replace this iframe with a real Google Maps embed */}
                                <div className="te-map-placeholder">
                                    <p>
                                        Map placeholder – embed Google Maps here later (Smyrna / your
                                        real location).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
