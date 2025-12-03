import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function TestimonialsPage() {
  return (
    <>
      {/* Page Banner */}
      <div
        className="te-breadcrumb-area"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 0',
        }}
      >
        <div className="container">
          <div className="te-breadcrumb-content text-center">
            <h1 className="te-breadcrumb-title" style={{ color: 'white' }}>Customer Testimonials</h1>
            <ul className="te-breadcrumb-list">
              <li>
                <a href="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</a>
              </li>
              <li className="active" style={{ color: 'white' }}>Testimonials</li>
            </ul>
          </div>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </>
  );
}
