import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/user/signup", {
        name,
        email,
        phone,
        password,
      });

      console.log(res.data);
      alert("Signup successful! You can now login.");
      navigate("/login"); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

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
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            required
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Signup</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
