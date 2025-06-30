import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewLogin = () => {
  let navigate = useNavigate();
  const [focusedField, setFocusedField] = useState('');
  const [loading, setLoading] = useState(false);



  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch(`https://oil-culture.onrender.com/api/login/LoginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    setLoading(false);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userRole", json.user.role);
      if (json.user.role === 'admin') {
        navigate('/admin-manage');
      }
      else {
        navigate('/');
      }
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
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
          <h1 className="signup-title">Login in your Account</h1>
        </div>

        <div className="signup-form">
          <div className="form-grid">

            <div className="form-group full-width">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="you@example.com"
                  required
                  className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Minimum 6 characters"
                  required
                  className={`form-input ${focusedField === 'password' ? 'focused' : ''}`}
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
                  {loading ? 'Logging in...' : 'Login'}
                </span>
                <div className="button-shine"></div>
              </button>
            </div>
          </div>

          <div className="signup-footer">
            <p className="login-text">
              Don't have an account?{' '}
              <button className="login-link" onClick={() => navigate('/signup')}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



export default NewLogin;
