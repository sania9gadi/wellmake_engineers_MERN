import React from 'react';
import './Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Get in touch with our team today!</p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <form>
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />

            <label>Email</label>
            <input type="email" placeholder="Your Email" required />

            <label>Message</label>
            <textarea rows="5" placeholder="Your Message" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Wellmake Engineers</h3>
          <p><strong>Address:</strong> 123 Industrial Area, Delhi, India</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Email:</strong> info@wellmakeengineers.com</p>

          <iframe
            title="Wellmake Engineers Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
