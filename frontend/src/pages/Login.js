/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/user/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        alert("Login Successfull")
        navigate("/admin/dashboard"); 
      } else {
        navigate("/user/dashboard");  
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/user/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      // ✅ Add this line to store admin/user info with name/email/phone
      localStorage.setItem("adminInfo", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        alert("Login Successfull");
        navigate("/admin/dashboard"); 
      } else {
        navigate("/user/dashboard");  
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
