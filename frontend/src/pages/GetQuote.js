import { useState } from "react";
import axios from "axios";
import "./GetQuote.css";

function GetQuote() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quoteData = {
      userName: name,
      address: company,
      message: message,
      quantity: 1, 
      productName: product, 
      email: email, 
    };

    try {
      const res = await axios.post("http://localhost:9000/api/quote/request", quoteData);
      alert("Quotation request submitted successfully!");
      console.log("Quote saved:", res.data);

      // Optionally reset form
      setName("");
      setEmail("");
      setCompany("");
      setProduct("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting quotation", err);
      alert("Failed to submit quotation. Please try again.");
    }
  };

  return (
    <div className="quote-container">
      <form className="quote-form" onSubmit={handleSubmit}>
        <h2>Request a Quotation</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="(Optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Interested In</label>
          <input
            type="text"
            required
            placeholder="e.g. Walk-in Freezer"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Requirements / Message</label>
          <textarea
            rows="4"
            placeholder="Describe your needs or specifications"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit">Request Quotation</button>
      </form>
    </div>
  );
}

export default GetQuote;
