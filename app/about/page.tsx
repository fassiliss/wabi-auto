'use client';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <PageBanner 
        title="About Wabi Automotive"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' }
        ]}
      />

      <section className="te-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                  Who We Are
                </h2>
                <p style={{ color: '#666', fontSize: '18px', lineHeight: '1.8' }}>
                  At Wabi Automotive, we provide expert auto repair and maintenance services 
                  with a commitment to quality, honesty, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .dark h2 {
          color: #ffffff !important;
        }
        .dark p {
          color: #d1d5db !important;
        }
      `}</style>
    </>
  );
}
