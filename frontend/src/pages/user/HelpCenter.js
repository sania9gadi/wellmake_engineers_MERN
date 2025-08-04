import React from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  return (
    <div className="help-center">
      <h1>Help Center</h1>
      <p className="intro">
        Welcome to our Help Center. Find answers to common questions or reach out for assistance.
      </p>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>How do I request a quotation?</h3>
          <p>You can request a quotation by visiting the product page and clicking on the "Request Quote" button.</p>
        </div>

        <div className="faq-item">
          <h3>How do I track my quotation request?</h3>
          <p>Go to your account and navigate to "My Quotations" to view the status of your requests.</p>
        </div>

        <div className="faq-item">
          <h3>How to send an inquiry?</h3>
          <p>Go to the product page and click on "Send Inquiry" after filling in the required details.</p>
        </div>

        <div className="faq-item">
          <h3>How much time it takes for order to complete?</h3>
          <p>Usually, it takes 5-7 business days to process and complete an order, depending on the product and location.</p>
        </div>

        <div className="faq-item">
          <h3>Where can I download brochure?</h3>
          <p>You can download the brochure directly from the product detail page by clicking on the "Download Brochure" button.</p>
        </div>
      </section>

      <section className="contact-section">
        <h2>Need More Help?</h2>
        <p>Reach out to our support team:</p>
        <ul>
          <li>Email: <a href="mailto:wellmake@gmai;.com">wellmake@gmail.com</a></li>
          <li>Phone: (+91)7845129360 </li>
          <li>Working hours 9 AM - 5 PM (Mon - Sat)</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpCenter;
