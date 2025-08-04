import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();

  // Admin routes list
  const hideFooterOnPaths = [
    '/admin/dashboard',
    '/admin/inquiries',
    '/admin/orders',
    '/admin/add-testimonial',
    '/admin/all-users',
    '/admin/add-product'];
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  if (shouldHideFooter) {
    return null; // Footer hide on admin pages
  }

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-left">
          <h3 className="footer-heading">We Build Cold Rooms, But We Warm Relationships ❄️❤️</h3>
          <div className="footer-contact-info">
            <p>📧 Email: <a href="mailto:support@wellmakeengineers.com">support@wellmakeengineers.com</a></p>
            <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
            <p>📸 Instagram: <a href="https://instagram.com/wellmake_engineers" target="_blank" rel="noopener noreferrer">@wellmake_engineers</a></p>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <div className="contact-widget">
            <h2>Have a Project in Mind?</h2>
            <p>Let’s get in touch and build something cool together.</p>
            <Link to="/inquiry" className="inquiry-btn">Send an Inquiry</Link>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Wellmake Engineers | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
