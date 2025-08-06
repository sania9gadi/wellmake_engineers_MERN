// src/pages/About.jsx

import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Wellmake Engineers</h1>
        <p>
          We are authorized dealers of Carrier Cold Room solutions, committed to delivering top-quality refrigeration and cold storage systems for various industries. Our mission is to provide durable, efficient, and cost-effective solutions tailored to your specific needs.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Carrier Cold Rooms & Custom Cold Storage</li>
          <li>Turnkey Project Solutions</li>
          <li>Annual Maintenance Contracts (AMC)</li>
          <li>24/7 Support & Consultation</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          With years of industry experience, we combine technical expertise with a customer-first approach. Our team ensures seamless installation, timely service, and unmatched reliability — making Wellmake Engineers your trusted cold room partner.
        </p>
      </section>
    </div>
  );
};

export default About;
