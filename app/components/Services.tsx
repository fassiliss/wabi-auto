"use client";

const services = [
    {
        slug: "engine-diagnostics",
        title: "Engine Diagnostics",
        image: "/images/service/service1.png",
        icon: "/images/icon/info-card/v-2/icon-1.png",
        desc: "Accurate computer diagnostics to find and fix engine issues before they become major problems.",
    },
    {
        slug: "suspension-tuning",
        title: "Suspension Tuning",
        image: "/images/service/suspension-tuning.png",
        icon: "/images/icon/info-card/v-2/icon-2.png",
        desc: "Smooth, stable rides with expert suspension inspection, repair, and tuning for all vehicle types.",
    },
    {
        slug: "transmission-service",
        title: "Transmission Service",
        image: "/images/service/transmission-service.png",
        icon: "/images/icon/info-card/v-2/icon-3.png",
        desc: "Professional transmission service to keep your gears shifting smoothly and extend transmission life.",
    },
];

export default function Services() {
    return (
        <section className="te-py-120 te-latest-service-area">
            <div className="container">
                {/* Section header */}
                <div className="row justify-content-between align-items-end mb-4">
                    <div className="col-lg-8">
                        <div className="te-section-title-wrapper">
                            <span className="short-title">OUR SERVICES</span>
                            <h2 className="title">Quality Car Service &amp; Repair</h2>
                            <p className="desc">
                                We provide complete auto care from diagnostics and maintenance to major repairs,
                                with honesty and transparency every step of the way.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 text-lg-end">
                        <a href="/services" className="te-theme-btn">
                            VIEW ALL SERVICES{" "}
                            <i className="fa-solid fa-arrow-right-long" />
                        </a>
                    </div>
                </div>

                {/* Slider-style service cards */}
                <div className="row te-latest-service-slider gy-4">
                    {services.map((service) => (
                        <div className="col-xl-4 col-md-6 slick-slider-item" key={service.slug}>
                            <div className="te-info-card style-2">
                                <div className="te-info-card-inner">
                                    {/* Image */}
                                    <div className="image">
                                        <img src={service.image} alt={service.title} />
                                    </div>

                                    {/* Content */}
                                    <div className="te-content-wrapper">
                                        {/* Icon */}
                                        <div className="icon">
                                            <img src={service.icon} alt={`${service.title} icon`} />
                                        </div>

                                        {/* Title */}
                                        <div className="te-title-wrapper">
                                            <h2 className="title">
                                                <a href={`/services/${service.slug}`}>{service.title}</a>
                                            </h2>
                                        </div>

                                        {/* Description */}
                                        <div className="content">
                                            <p className="desc">{service.desc}</p>
                                        </div>

                                        {/* Read more */}
                                        <div className="te-read-more">
                                            <a
                                                href={`/services/${service.slug}`}
                                                className="te-theme-btn"
                                            >
                                                READ MORE{" "}
                                                <i className="fa-solid fa-arrow-right-long" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
