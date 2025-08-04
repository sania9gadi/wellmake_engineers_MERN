import './Home.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import carrierLogo from '../assets/carrier_logo.jpg';


const testimonials = [
  {
    text: 'Exceptional service! Their cold rooms are reliable and energy-efficient.',
    author: '- Amit S., Food Processing Plant',
  },
  {
    text: 'Delivered on time and installed professionally. Great experience!',
    author: '- Pooja R., Pharma Exporter',
  },
  {
    text: 'Customer support was amazing. Highly recommended.',
    author: '- Rahul M., Hotel Chain Owner',
  },
];

function Home() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Wellmake Engineers</h1>
        <p>Premium Cold Room Solutions for Every Industry</p>
      </section>

      {/* Popular Products Section */}
      <section id="popular-products" className="section">
        <h2>Popular Products</h2>
        <div className="product-cards">
          <div className="card">
            <h3>Cold Storage Room</h3>
            <p>Efficient temperature control for food and pharma.</p>
          </div>
          <div className="card">
            <h3>Walk-In Freezer</h3>
            <p>High-capacity cold storage for industrial use.</p>
          </div>
          <div className="card">
            <h3>PUF Panels</h3>
            <p>Modular insulated panels for custom setups.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section  id ="about" className="section about-section">
        <h2>About Us</h2>
        <p>
          At WellMake Engineers, we take pride in being trusted dealers of Carrier India,
          offering cutting-edge cold chain and refrigeration solutions tailored for industries
          such as food, pharmaceuticals, logistics, and more. Backed by years of expertise and
          a dedicated team of professionals, we deliver efficient, reliable, and customized cooling
          systems that meet your operational needs. From concept to installation, our mission is to
          ensure optimal performance, energy savings, and complete peace of mind for every client we serve.
        </p>
      </section>
      {/* Carrier Widget */}
      <section className="section carrier-widget">
        <h2>Official Dealer of</h2>
        <Link
          to="https://www.carrier.com/commercial/en/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="carrier-link"
        >
          <img
            src={carrierLogo}
            alt="Carrier Logo"
            className="carrier-logo"
            width="180"
          />
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h3>What Our Clients Say</h3>
        <div className="carousel-box">
          <button className="nav-btn" onClick={handlePrev}>‹</button>

          <div className="testimonial-card">
            <p className="quote">“{testimonials[index].text}”</p>
            <h4 className="author">{testimonials[index].author}</h4>
          </div>

          <button className="nav-btn" onClick={handleNext}>›</button>
        </div>
      </section>

      

      
      {/* Location Map */}
      <section className="location-section">
  <h3>Our Location</h3>
  <p>Visit our office at the heart of the city. Find us on the map below.</p>
  <div className="location-map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6999.884539501364!2d77.20042377422558!3d28.69137348140846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf325555515%3A0x74ea0e157e89570b!2sVijay%20Nagar%20Single%20Storey%20Resident%20Welfare%20Association!5e0!3m2!1sen!2sin!4v1753710023681!5m2!1sen!2sin"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Wellmake Engineers Location"
    ></iframe>
  </div>
</section>

    </div>
  );
}

export default Home;
