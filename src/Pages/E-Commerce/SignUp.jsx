import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error message

    if (credentials.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const response = await fetch(`https://oil-culture.onrender.com/api/login/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    setLoading(false);

    if (!json.success) {
      setErrorMessage("Signup failed. Please try again.");
    } else {
      alert("Signup successful!");
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form className="signup-form shadow p-4 rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your full name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            name="phone"
            value={credentials.phone}
            onChange={onChange}
            pattern="[0-9]{10}" // Optional validation
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter your location"
            name="location"
            value={credentials.location}
            onChange={onChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Link to="/login" className="btn btn-danger">
            Already a user?
          </Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing Up..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
