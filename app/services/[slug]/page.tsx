import Footer from "../../components/Footer";

// Simple service data map
const services: Record<
    string,
    {
        title: string;
        image: string;
        short: string;
        description: string;
        features: string[];
    }
> = {
    "engine-diagnostics": {
        title: "Engine Diagnostics",
        image: "/images/service/service-custom1.png",
        short: "Advanced engine checks to keep your car running smoothly.",
        description:
            "We use advanced diagnostic tools to analyze your engine's performance, detect error codes, and identify issues before they become major problems. From fuel system checks to ignition analysis, we ensure your engine is operating at its best.",
        features: [
            "Full ECU Scan",
            "Fuel System Inspection",
            "Ignition System Check",
            "Performance Analysis",
        ],
    },
    "suspension-tuning": {
        title: "Suspension Tuning",
        image: "/images/service/service-2.jpg",
        short: "Comfort, control, and stability for every drive.",
        description:
            "Our suspension tuning service focuses on improving ride comfort, handling, and overall stability. Whether you want a smoother city ride or a more responsive feel, we adjust your suspension to match your driving style.",
        features: [
            "Shock Absorber Inspection",
            "Springs & Coil Check",
            "Balance & Alignment",
            "Comfort & Handling Tuning",
        ],
    },
    "transmission-service": {
        title: "Transmission Service",
        image: "/images/service/service-3.jpg",
        short: "Smooth shifting and long-lasting transmission health.",
        description:
            "We provide complete transmission service, from fluid changes to detailed inspection and performance testing. Our goal is to prevent costly failures and keep your vehicle shifting smoothly.",
        features: [
            "Transmission Fluid Change",
            "Diagnostic Scan",
            "Leak Inspection",
            "Road Test & Performance Check",
        ],
    },
};

export default function ServiceDetailsPage({
                                               params,
                                           }: {
    params: { slug: string };
}) {
    const service = services[params.slug];

    if (!service) {
        return (
            <main style={{ padding: "4rem", textAlign: "center" }}>
                <h1>Service Not Found</h1>
                <p>
                    The service you are looking for does not exist. Please go back to{" "}
                    <a href="/services" style={{ textDecoration: "underline" }}>
                        Services
                    </a>
                    .
                </p>
            </main>
        );
    }

    return (
        <>
            {/* Breadcrumb */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">{service.title}</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/services">Services</a>
                            </li>
                            <li className="active">{service.title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Service Details Content */}
            <section className="te-py-120">
                <div className="container">
                    <div className="row gy-5">
                        {/* Main content */}
                        <div className="col-lg-8">
                            <div className="te-service-details">
                                <div className="te-service-image mb-4">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="img-fluid"
                                    />
                                </div>

                                <h2 className="mb-3">{service.title}</h2>
                                <p className="te-service-short-desc">{service.short}</p>

                                <p className="te-service-desc">{service.description}</p>

                                <h3 className="mt-4 mb-3">What&apos;s Included</h3>
                                <ul className="te-service-list">
                                    {service.features.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <aside className="te-sidebar">
                                <div className="te-sidebar-widget mb-4">
                                    <h4 className="te-sidebar-title">All Services</h4>
                                    <ul>
                                        {Object.keys(services).map((key) => (
                                            <li key={key}>
                                                <a href={`/services/${key}`}>{services[key].title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="te-sidebar-widget te-contact-box">
                                    <h4 className="te-sidebar-title">Need Help?</h4>
                                    <p>
                                        Call us for quick support, booking, or questions about this
                                        service.
                                    </p>
                                    <p className="mb-1">
                                        <strong>Phone:</strong> (307) 555-0133
                                    </p>
                                    <p className="mb-3">
                                        <strong>Email:</strong> info@example.com
                                    </p>
                                    <a href="/contact" className="te-theme-btn w-100 text-center">
                                        CONTACT US
                                    </a>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
