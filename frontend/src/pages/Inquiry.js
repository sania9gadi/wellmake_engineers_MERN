import { useState } from "react";
import axios from "axios";
import "./Inquiry.css";

function Inquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] =useState("");
  const [product, setProduct] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token sending:", token);

    try {
      const res = await axios.post(
        "http://localhost:9000/api/inquiry/save",
        {
          name,
          email,
          phone,
          product,
          message, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("Inquiry submitted:", res.data);
      alert("Inquiry submitted successfully!");

     
      setName("");
      setEmail("");
      setPhone("");
      setProduct("");
      setMessage("");

    } catch (error) {
      console.error("Inquiry submission failed:", error);
      alert("Failed to submit inquiry. Please login or try again.");
    }
  };

  return (
    <div className="inquiry-container">
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <h2>Product Inquiry</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
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
          <label>Phone No.</label>
          <input
            type="string"
            required
            placeholder="Your PhoneNo."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product</label>
          <input
            type="text"
            required
            placeholder="Product you are interested in"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Your Requirements</label>
          <textarea
            rows="4"
            placeholder="Add any specific requirements"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit">Submit Inquiry</button>
      </form>
    </div>
  );
}

export default Inquiry;
