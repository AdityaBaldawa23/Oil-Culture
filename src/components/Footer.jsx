import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f7f7fb", padding: "60px 0 30px 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h3 
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                background: "linear-gradient(135deg, #8e44ad, #6c5ce7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px"
              }}
            >
              Rama Mangoes
            </h3>
            <p style={{ color: "#636e72", marginBottom: "20px", lineHeight: "1.6" }}>
              Delivering happiness with every order. Our chefs prepare each dish with love and care to give you an exceptional dining experience.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link style={{ color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M18.896 0H4.104C1.655 0 0 1.655 0 4.104v15.793C0 22.345 1.655 24 4.104 24h4.946V14.706H6.057V10.8h3.15V8.075c0-3.095 1.891-4.788 4.693-4.788 1.328 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.905h-3.12V24h6.115c2.449 0 4.104-1.655 4.104-4.104V4.104C23 1.655 21.345 0 18.896 0z"/>
                </svg>
              </Link>
              <Link style={{ color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.094 10.094 0 01-3.127 1.184A4.92 4.92 0 0016.687 2a4.935 4.935 0 00-4.928 4.928c0 .39.044.77.128 1.13A13.978 13.978 0 011.67 3.148a4.935 4.935 0 001.524 6.574 4.923 4.923 0 01-2.229-.616 4.93 4.93 0 003.95 4.828 4.966 4.966 0 01-2.224.084 4.935 4.935 0 004.6 3.42A9.875 9.875 0 010 19.539a13.885 13.885 0 007.548 2.209c9.056 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.013-.638A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link style={{ color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2C6.478 2 2 6.478 2 12s4.478 10 10 10 10-4.478 10-10S17.522 2 12 2zm5.076 8.648c.003.11.003.22.003.33 0 3.37-2.563 7.258-7.26 7.258a7.21 7.21 0 01-3.908-1.144 5.27 5.27 0 003.876-1.084 2.622 2.622 0 01-2.447-1.817c.17.03.338.05.514.05.247 0 .486-.033.71-.094a2.618 2.618 0 01-2.11-2.567v-.034c.35.198.757.317 1.19.33a2.617 2.617 0 01-.814-3.49 7.42 7.42 0 005.382 2.73 2.62 2.62 0 012.46-3.105c.942 0 1.79.395 2.387 1.03 5.25 5.25 0 001.665-.636 2.629 2.629 0 01-1.153 1.45 5.252 5.252 0 001.505-.413 5.32 5.32 0 01-1.31 1.357z"/>
                </svg>
              </Link>
              <Link style={{ color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h5 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "1.1rem", color: "#2d3436" }}>Quick Links</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Home</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/menu" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Menu</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/about" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>About Us</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/contact" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h5 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "1.1rem", color: "#2d3436" }}>Categories</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/category/vegetarian" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Devgad</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/category/non-vegetarian" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Raw Mango</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/category/beverages" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Ratnagiri</Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/category/desserts" style={{ textDecoration: "none", color: "#636e72", transition: "color 0.2s ease" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#636e72"}>Payri</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-4 mb-4">
            <h5 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "1.1rem", color: "#2d3436" }}>Contact Us</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span style={{ color: "#636e72" }}>1011, Kapad Peth, Sangli</span>
              </li>
              <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span style={{ color: "#636e72" }}>+91 9423035733</span>
              </li>
              <li style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span style={{ color: "#636e72" }}>maheshbaldawa80@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <hr style={{ borderTop: "1px solid #dfe6e9", margin: "0 0 20px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "#b2bec3", fontSize: "14px" }}>
              <p>&copy; {new Date().getFullYear()} Rama Mangoes. All rights reserved.</p>
              <div>
                <Link to="/privacy-policy" style={{ color: "#b2bec3", marginRight: "15px", textDecoration: "none" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#b2bec3"}>Privacy Policy</Link>
                <Link to="/terms-of-service" style={{ color: "#b2bec3", textDecoration: "none" }} onMouseOver={(e) => e.target.style.color = "#6c5ce7"} onMouseOut={(e) => e.target.style.color = "#b2bec3"}>Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}