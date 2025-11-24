import Footer from "../components/Footer";

export default function ServicesPage() {
    return (
        <>
            {/* Page Banner / Breadcrumb */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')", // you can change to service-bg later
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">Our Services</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="active">Services</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Services List */}
            <section className="te-py-120">
                <div className="container">
                    <div className="row gy-4 justify-content-center">
                        {/* Service 1 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="te-info-card style-2">
                                <div className="te-info-card-inner">
                                    <div className="image">
                                        <img
                                            src="/images/service/service-custom1.png"
                                            alt="Engine Diagnostics"
                                        />
                                    </div>
                                    <div className="te-content-wrapper">
                                        <div className="icon">
                                            <img
                                                src="/images/icon/info-card/v-2/icon-1.png"
                                                alt="Engine Diagnostics icon"
                                            />
                                        </div>
                                        <div className="te-title-wrapper">
                                            <h2 className="title">
                                                <a href="#">Engine Diagnostics</a>
                                            </h2>
                                        </div>
                                        <div className="content">
                                            <p className="desc">
                                                Accurate computer diagnostics to find and fix engine
                                                issues before they become major problems.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="te-info-card style-2">
                                <div className="te-info-card-inner">
                                    <div className="image">
                                        <img
                                            src="/images/service/service-custom2.png"
                                            alt="Suspension Tuning"
                                        />
                                    </div>
                                    <div className="te-content-wrapper">
                                        <div className="icon">
                                            <img
                                                src="/images/icon/info-card/v-2/icon-2.png"
                                                alt="Suspension Tuning icon"
                                            />
                                        </div>
                                        <div className="te-title-wrapper">
                                            <h2 className="title">
                                                <a href="#">Suspension Tuning</a>
                                            </h2>
                                        </div>
                                        <div className="content">
                                            <p className="desc">
                                                Smooth, stable rides with expert suspension inspection,
                                                repair, and tuning for all vehicle types.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="te-info-card style-2">
                                <div className="te-info-card-inner">
                                    <div className="image">
                                        <img
                                            src="/images/service/service-custom3.png"
                                            alt="Transmission Service"
                                        />
                                    </div>
                                    <div className="te-content-wrapper">
                                        <div className="icon">
                                            <img
                                                src="/images/icon/info-card/v-2/icon-3.png"
                                                alt="Transmission Service icon"
                                            />
                                        </div>
                                        <div className="te-title-wrapper">
                                            <h2 className="title">
                                                <a href="#">Transmission Service</a>
                                            </h2>
                                        </div>
                                        <div className="content">
                                            <p className="desc">
                                                Professional transmission inspection, fluid change, and
                                                repair to keep your gears shifting smoothly.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* You can add more services here the same way */}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
