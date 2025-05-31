import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../Modal";
import Cart from "../../Pages/E-Commerce/Cart";
import "../E-Commerce/Navbar.css";  

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ViewCart, setViewCart] = useState(false);
  const [menuopen, setmenuopen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <Link to="/" className="logo">Oil Culture</Link>

          <div className="nav-links">
            {isLoggedIn ? (
              <>

                <Link className={isActive("/admin-manage") ? "active" : ""} to="/admin-manage">
                  Dashboard
                </Link>

                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className={isActive("/signup") ? "active" : ""} to="/signup">
                  Sign Up
                </Link>
                <Link className={isActive("/login") ? "active" : ""} to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setmenuopen((prev) => !prev)}
        >
          ☰
        </button>
      </nav>
      <Modal isOpen={ViewCart} onClose={() => setViewCart(false)}>
        <Cart />
      </Modal>
    </>
  );
}
