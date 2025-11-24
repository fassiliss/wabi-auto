"use client";

export default function Hero() {
    return (
        <div className="slider-area style-1">
            <div className="te-slider-wrapper">
                <div className="te-single-slider-wrapper">
                    <div
                        className="te-single-slider"
                        style={{ backgroundImage: "url('/images/slider/slider-1.png')" }}
                    >
                        <div className="te-slider-overlay"></div>

                        {/*<div className="te-slider-feature-image">*/}
                        {/*    <img src="/images/slider/slider-feature-one.png" alt="feature" />*/}
                        {/*</div>*/}

                        <div className="container h-100">
                            <div className="te-slider-container">
                                <div className="te-slider-column">
                                    <div className="te-slider-content-wrapper">
                                        <div className="te-slider-content">
                                            <span className="te-slider-short-title">CAR REPAIR</span>
                                            <h1 className="te-slider-title">
                                                Mastering the Art of Auto Repair
                                            </h1>
                                            <p className="te-slider-short-desc">
                                                Et purus duis sollicitudin dignissim habitant. Egestas
                                                nulla quis venenatis cras sed Et purus duis sollicitudin
                                                dignissim habitant. Egestas
                                            </p>
                                            <div className="te-slider-btn-wrapper">
                                                <a href="/contact" className="te-theme-btn style-2">
                                                    CONTACT NOW{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                                <a
                                                    href="https://www.youtube.com/watch?v=7e90gBu4pas"
                                                    className="te-call-btn video-play mfp-iframe"
                                                >
                                                    <div className="te-icon">
                                                        <i className="fa-solid fa-play"></i>
                                                    </div>
                                                    <div className="te-content">
                                                        <span className="te-text">HOW WE WORK</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="te-slider-column">
                                    <div className="te-slider-image">
                                        <div className="slider-feature">
                                            <div className="single-slider-feature">
                                                <div className="slider-feature-content">
                                                    <h3 className="title">20K</h3>
                                                    <p className="sub-title">Satisfied Clients</p>
                                                </div>
                                                <div className="slider-feature-img">
                                                    <img
                                                        src="/images/slider/feature-icon-1.png"
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>

                                            <div className="single-slider-feature">
                                                <div className="slider-feature-content">
                                                    <h3 className="title">400</h3>
                                                    <p className="sub-title">Team Member</p>
                                                </div>
                                                <div className="slider-feature-img">
                                                    <img
                                                        src="/images/slider/feature-icon-2.png"
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>

                                            <div className="single-slider-feature">
                                                <div className="slider-feature-content">
                                                    <h3 className="title">150</h3>
                                                    <p className="sub-title">Winning Award</p>
                                                </div>
                                                <div className="slider-feature-img">
                                                    <img
                                                        src="/images/slider/feature-icon-3.png"
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>

                                            <div className="single-slider-feature">
                                                <div className="slider-feature-content">
                                                    <h3 className="title">7K</h3>
                                                    <p className="sub-title">Clients Review</p>
                                                </div>
                                                <div className="slider-feature-img">
                                                    <img
                                                        src="/images/slider/feature-icon-4.png"
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end right column */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
