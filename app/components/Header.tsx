"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;

            // Always show header near top of page
            if (current < 100) {
                setIsSticky(false);
                setIsVisible(true);
                setLastScrollY(current);
                return;
            }

            if (current > lastScrollY) {
                // scrolling DOWN -> hide header
                setIsVisible(false);
            } else {
                // scrolling UP -> show + make sticky
                setIsSticky(true);
                setIsVisible(true);
            }

            setLastScrollY(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const headerClassName = [
        "header-area",
        "style-1",
        isSticky ? "is-sticky" : "",
        !isVisible ? "is-hidden" : "",
    ]
        .join(" ")
        .trim();

    return (
        <header className={headerClassName}>
            <div className="header-area-wrapper">
                {/* Top-left logo (main) */}
                <div className="logo-wrapper d-flex align-items-center">
                    <div className="te-logo">
                        <Link href="/" className="te-standard-logo">
                            <img src="/images/logo/logo-white.png" alt="logo" />
                        </Link>
                    </div>
                </div>

                <div className="header-inner">
                    {/* ========== HEADER TOP BAR ========== */}
                    <div className="header-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="te-header-top-wrapper">
                                        {/* Left side – contact info */}
                                        <div className="header-top-info">
                                            <div className="te-header-contact-info">
                                                <span>
                                                    <a href="mailto:info@example.com">
                                                        <i className="fa-solid fa-envelope"></i>
                                                        info@example.com
                                                    </a>
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    6391 Elgin Rt.Mirpur, 10299
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-clock"></i>
                                                    Sunday - Friday: 9 am - 8 pm
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right side – social icons */}
                                        <div className="header-top-info">
                                            <div className="te-social-profile">
                                                <Link href="#">
                                                    <i className="fa-brands fa-facebook-f"></i>
                                                </Link>
                                                <Link href="#">
                                                    <i className="fa-brands fa-twitter"></i>
                                                </Link>
                                                <Link href="#">
                                                    <i className="fa-brands fa-linkedin-in"></i>
                                                </Link>
                                                <Link href="#">
                                                    <i className="fa-brands fa-youtube"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== MAIN NAV / STICKY HEADER ========== */}
                    <div className="te-header-menu-area te-sticky-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-end">
                                    {/* Sticky logos */}
                                    <div className="te-logo-wrapper">
                                        <div className="te-logo">
                                            <Link href="/" className="te-sticky-logo">
                                                <img src="/images/logo/logo.png" alt="logo" />
                                            </Link>
                                            <Link href="/" className="te-retina-logo">
                                                <img src="/images/logo/logo.png" alt="logo" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* ===== MAIN MENU ===== */}
                                    <div className="te-menu d-inline-block">
                                        <nav id="main-menu" className="te-main-menu">
                                            <ul>
                                                {/* Home */}
                                                <li className="te-dropdown active">
                                                    <Link href="/">Home</Link>
                                                </li>

                                                {/* About – simple link for now */}
                                                <li>
                                                    <Link href="/about">About Us</Link>
                                                </li>

                                                {/* Services dropdown */}
                                                <li className="te-dropdown menu-item-has-children">
                                                    <Link href="/services">Services</Link>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/services">All Services</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/services/engine-diagnostics">
                                                                Engine Diagnostics
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/services/suspension-tuning">
                                                                Suspension Tuning
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/services/transmission-service">
                                                                Transmission Service
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                {/* Projects dropdown */}
                                                <li className="te-dropdown menu-item-has-children">
                                                    <Link href="/projects">Projects</Link>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/projects">Projects Grid</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/projects/premium-car-polishing">
                                                                Project Details
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                {/* Blog dropdown */}
                                                <li className="te-dropdown menu-item-has-children">
                                                    <Link href="/blog">Blog</Link>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/blog">Blog List</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/blog/sample-post">
                                                                Blog Details
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                {/* Team dropdown */}
                                                <li className="te-dropdown menu-item-has-children">
                                                    <Link href="/team">Team</Link>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/team">Our Team</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/team/lead-technician">
                                                                Team Details
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                {/* Contact */}
                                                <li>
                                                    <Link href="/contact">Contact</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    {/* ===== Header buttons (phone + quote) ===== */}
                                    <div className="te-header-btn">
                                        <div className="te-cta-btn">
                                            <span>Need help?</span>
                                            <a href="tel:13075550133">
                                                <i className="fa-solid fa-phone"></i>(307) 555-0133
                                            </a>
                                        </div>
                                        <a href="#" className="te-quote-btn">
                                            GET A QUOTE{" "}
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>

                                    {/* Mobile menu toggle */}
                                    <div className="te-mobile-menu-bar d-lg-none text-end">
                                        <a href="#" className="te-mobile-menu-toggle-btn">
                                            <i className="fal fa-bars"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
