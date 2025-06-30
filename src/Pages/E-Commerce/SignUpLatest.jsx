import React, { useState } from 'react';
import './signup.css'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!/^\d{10}$/.test(credentials.phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (credentials.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://oil-culture.onrender.com/api/login/CreateUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      const json = await response.json();
      setLoading(false);

      if (!json.success) {
        setErrorMessage("Signup failed. Please try again.");
      } else {
        alert("🎉 Signup successful!");
        // Handle successful signup (redirect, etc.)
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    alert('Login page would be navigated to here');
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="signup-card">
        <div className="signup-header">
          <div className="brand-logo">
            <span className="brand-text">Oil Culture</span>
            <div className="brand-dot"></div>
          </div>
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join our community and start your journey</p>
        </div>

        {errorMessage && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="signup-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Enter your full name"
                  required
                  className={`form-input ${focusedField === 'name' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="phone"
                  value={credentials.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  placeholder="1234567890"
                  maxLength="10"
                  required
                  className={`form-input ${focusedField === 'phone' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="you@example.com"
                  required
                  className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Minimum 6 characters"
                  required
                  className={`form-input ${focusedField === 'password' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="location"
                  value={credentials.location}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField('')}
                  placeholder="City, Country"
                  required
                  className={`form-input ${focusedField === 'location' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group full-width">
              <button
                type="submit"
                disabled={loading}
                className={`submit-button ${loading ? 'loading' : ''}`}
                onClick={handleSubmit}
              >
                <span className="button-text">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </span>
                <div className="button-shine"></div>
              </button>
            </div>
          </div>

          <div className="signup-footer">
            <p className="login-text">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="login-link">
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;