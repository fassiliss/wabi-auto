'use client';

import Link from 'next/link';
import Footer from '../../components/Footer';
import PageBanner from '../../components/PageBanner';

const serviceItems = [
  'Transmission fluid condition check',
  'Leak inspection around seals, lines, and pan',
  'Shift quality and drivability review',
  'Filter replacement recommendations when needed',
  'Computer scan for transmission-related codes',
  'Repair options explained before work begins',
];

const warningSigns = [
  'Delayed or hard shifting',
  'Slipping between gears',
  'Transmission fluid leak',
  'Grinding, whining, or humming noise',
  'Burning smell after driving',
  'Warning light or limp mode',
];

export default function TransmissionServicePage() {
  return (
    <>
      <div style={{ marginTop: '140px' }}>
        <PageBanner
          title="Transmission Service"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Transmission Service' },
          ]}
          backgroundImage="/images/service/transmission-service.png"
        />

        <section className="service-details te-py-120">
          <div className="container">
            <div className="row gy-5 align-items-start">
              <div className="col-lg-7">
                <span className="short-title">Protect Your Drivetrain</span>
                <h2 className="details-title">Transmission care for smoother, safer shifting</h2>
                <p className="lead-copy">
                  Transmission problems can grow quickly when ignored. Wabi Automotive checks fluid
                  condition, scan data, leaks, and shift behavior to help prevent unnecessary damage
                  and keep your vehicle moving reliably.
                </p>
                <p className="body-copy">
                  From maintenance to diagnosis, we give you straightforward answers and practical
                  repair options based on what your vehicle actually needs.
                </p>

                <div className="image-panel">
                  <img src="/images/service/transmission-service.png" alt="Transmission service" />
                </div>
              </div>

              <aside className="col-lg-5">
                <div className="booking-card">
                  <div className="card-icon">
                    <i className="fa-solid fa-gears"></i>
                  </div>
                  <h3>Transmission Visit</h3>
                  <p>
                    Schedule a transmission check for shifting issues, leaks, maintenance, or a
                    warning light.
                  </p>
                  <Link href="/booking" className="primary-action">
                    Book Transmission Service
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </Link>
                  <Link href="/contact" className="secondary-action">
                    Ask a Question
                  </Link>
                </div>
              </aside>
            </div>

            <div className="row gy-4 details-grid">
              <div className="col-lg-6">
                <div className="info-box">
                  <h3>What&apos;s Included</h3>
                  <ul>
                    {serviceItems.map((item) => (
                      <li key={item}>
                        <i className="fa-solid fa-check"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info-box">
                  <h3>When To Schedule</h3>
                  <ul>
                    {warningSigns.map((item) => (
                      <li key={item}>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        .service-details { background: #f8fafc; }
        .details-title { color: #111827; font-size: 42px; font-weight: 900; line-height: 1.12; margin: 12px 0 18px; }
        .lead-copy, .body-copy { color: #4b5563; font-size: 18px; line-height: 1.8; margin-bottom: 18px; }
        .body-copy { font-size: 16px; }
        .image-panel { border-radius: 8px; overflow: hidden; margin-top: 28px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.14); }
        .image-panel img { width: 100%; min-height: 320px; object-fit: cover; }
        .booking-card, .info-box { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08); }
        .booking-card { padding: 34px; position: sticky; top: 150px; }
        .card-icon { width: 64px; height: 64px; border-radius: 16px; background: #ef4444; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 20px; }
        .booking-card h3, .info-box h3 { color: #111827; font-size: 24px; font-weight: 900; margin-bottom: 14px; }
        .booking-card p { color: #4b5563; line-height: 1.7; margin-bottom: 24px; }
        .primary-action, .secondary-action { display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 8px; font-weight: 900; text-decoration: none; padding: 14px 18px; transition: transform 0.2s ease, background 0.2s ease; }
        .primary-action { background: #ef4444; color: #ffffff; margin-bottom: 12px; }
        .primary-action:hover { background: #dc2626; transform: translateY(-2px); }
        .secondary-action { color: #111827; background: #f3f4f6; }
        .secondary-action:hover { background: #e5e7eb; }
        .details-grid { margin-top: 44px; }
        .info-box { height: 100%; padding: 32px; }
        .info-box ul { list-style: none; margin: 0; padding: 0; }
        .info-box li { display: flex; align-items: flex-start; gap: 12px; color: #4b5563; line-height: 1.6; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .info-box li:last-child { border-bottom: 0; }
        .info-box i { color: #ef4444; margin-top: 5px; }
        .dark .service-details { background: #0a0a0a; }
        .dark .details-title, .dark .booking-card h3, .dark .info-box h3 { color: #ffffff; }
        .dark .lead-copy, .dark .body-copy, .dark .booking-card p, .dark .info-box li { color: #d1d5db; }
        .dark .booking-card, .dark .info-box { background: #111827; border-color: #1f2937; }
        .dark .secondary-action { background: #1f2937; color: #ffffff; }
        @media (max-width: 991px) { .details-title { font-size: 34px; } .booking-card { position: static; } }
      `}</style>
    </>
  );
}
