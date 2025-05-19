import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 210, 127, 0.95), rgba(255, 183, 77, 0.95))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 -4px 20px rgba(211, 140, 63, 0.15)",
        borderTop: "1px solid rgba(255, 255, 255, 0.25)",
        padding: "60px 0 30px 0",
        color: "#333",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h3
              style={{
                fontWeight: "800",
                fontSize: "2rem",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #ff6b00, #ff3d00)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
                letterSpacing: "-0.5px",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              Rama Mangoes
            </h3>
            <p
              style={{
                color: "#1e272e",
                marginBottom: "20px",
                lineHeight: "1.6",
              }}
            >
              Delivering the freshest happiness with every mango. Our farmers handpick each fruit with care to bring you the sweetest, juiciest taste straight to your doorstep.
            </p>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h5
              style={{
                fontWeight: "700",
                marginBottom: "16px",
                fontSize: "1.1rem",
                color: "#1e272e",
              }}
            >
              Quick Links
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#1e272e",
                    fontWeight: "600",
                    transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    padding: "4px 0",
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#ff6b00";
                    e.target.style.transform = "translateX(5px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#1e272e";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a
                  href="https://api.whatsapp.com/send/?phone=919423035733&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#1e272e",
                    fontWeight: "600",
                    transition: "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    padding: "4px 0",
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#ff6b00";
                    e.target.style.transform = "translateX(5px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#1e272e";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h5
              style={{
                fontWeight: "700",
                marginBottom: "16px",
                fontSize: "1.1rem",
                color: "#1e272e",
              }}
            >
              Categories
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Devgad", "Raw Mango", "Ratnagiri", "Payri"].map((name) => (
                <li key={name} style={{ marginBottom: "10px" }}>
                  <span
                    style={{
                      color: "#1e272e",
                      fontWeight: "600",
                      transition:
                        "all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      padding: "4px 0",
                      position: "relative",
                      display: "inline-block",
                      cursor: "default",
                      userSelect: "none",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#ff6b00";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#1e272e";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <h5
              style={{
                fontWeight: "700",
                marginBottom: "16px",
                fontSize: "1.1rem",
                color: "#1e272e",
              }}
            >
              Contact Us
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(255, 107, 0, 0.15)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span style={{ color: "#1e272e", fontWeight: "500" }}>
                  1011, Kapad Peth, Sangli
                </span>
              </li>
              <li
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(255, 107, 0, 0.15)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span style={{ color: "#1e272e", fontWeight: "500" }}>
                  +91 9423035733
                </span>
              </li>
              <li
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(255, 107, 0, 0.15)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span style={{ color: "#1e272e", fontWeight: "500" }}>
                  maheshbaldawa80@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <hr
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                margin: "0 0 20px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                color: "#1e272e",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <p>
                &copy; {new Date().getFullYear()} Rama Mangoes. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
