'use client';
import { useState } from 'react';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setResult({ type: 'success', message: 'Thank you! We received your request and will contact you soon.' });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setResult({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setResult({ type: 'error', message: 'Failed to send request. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <>
      <div style={{ marginTop: '140px' }}><PageBanner 
        title="Contact Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' }
        ]}
      />

      <section className="te-py-120">
        <div className="container">
          <div className="row gy-5">
            {/* Contact Info */}
            <div className="col-lg-4">
              <div className="contact-info-wrapper">
                <h3 className="mb-4">Get In Touch</h3>
                
                <div className="contact-info-item mb-4">
                  <div className="icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="content">
                    <h5>Address</h5>
                    <p>2401 Dickerson Pike, Nashville, Tn , 37207</p>
                  </div>
                </div>

                <div className="contact-info-item mb-4">
                  <div className="icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="content">
                    <h5>Phone</h5>
                    <p>(615) 582-3291</p>
                  </div>
                </div>

                <div className="contact-info-item mb-4">
                  <div className="icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="content">
                    <h5>Email</h5>
                    <p>info@example.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="content">
                    <h5>Working Hours</h5>
                    <p>Sunday - Friday: 9am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <h3 className="mb-4">Request a Service</h3>
                
                {result && (
                  <div
                    className={`alert ${result.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}
                    style={{
                      padding: '15px',
                      borderRadius: '8px',
                      backgroundColor: result.type === 'success' ? '#d4edda' : '#f8d7da',
                      color: result.type === 'success' ? '#155724' : '#721c24',
                      border: `1px solid ${result.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                    }}
                  >
                    {result.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control contact-input"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control contact-input"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="tel"
                        name="phone"
                        className="form-control contact-input"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <select
                        name="service"
                        className="form-control contact-input"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Service *</option>
                        <option value="Engine Diagnostics">Engine Diagnostics</option>
                        <option value="Suspension Tuning">Suspension Tuning</option>
                        <option value="Transmission Service">Transmission Service</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Brake Repair">Brake Repair</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <textarea
                        name="message"
                        className="form-control contact-input"
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="te-theme-btn"
                        disabled={loading}
                        style={{
                          opacity: loading ? 0.6 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? 'SENDING...' : 'SEND REQUEST'}{' '}
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div><Footer />

      <style jsx>{`
        .contact-info-wrapper {
          background: white;
          padding: 40px 30px;
          border-radius: 12px;
          height: 100%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .dark .contact-info-wrapper {
          background: #1a1a1a !important;
          box-shadow: 0 2px 10px rgba(255,255,255,0.05) !important;
        }

        .contact-info-item {
          display: flex;
          gap: 20px;
        }

        .contact-info-item .icon {
          width: 50px;
          height: 50px;
          background: #2563eb;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .contact-info-item h5 {
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .dark .contact-info-item h5 {
          color: #ffffff !important;
        }

        .contact-info-item p {
          margin: 0;
          color: #666;
        }

        .dark .contact-info-item p {
          color: #d1d5db !important;
        }

        .contact-info-wrapper h3 {
          color: #333;
        }

        .dark .contact-info-wrapper h3 {
          color: #ffffff !important;
        }

        .contact-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .dark .contact-form-wrapper {
          background: #1a1a1a !important;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05) !important;
        }

        .contact-form-wrapper h3 {
          color: #333;
        }

        .dark .contact-form-wrapper h3 {
          color: #ffffff !important;
        }

        .contact-input {
          padding: 15px 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
          color: #333;
        }

        .dark .contact-input {
          background: #2a2a2a !important;
          border-color: #444 !important;
          color: #ffffff !important;
        }

        .contact-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .dark .contact-input:focus {
          border-color: #60a5fa !important;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1) !important;
        }

        .contact-input::placeholder {
          color: #999;
        }

        .dark .contact-input::placeholder {
          color: #666 !important;
        }

        select.contact-input {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
