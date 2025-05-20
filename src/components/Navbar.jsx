import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../Pages/Cart";
import "./Navbar.css"; // import the new CSS

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ViewCart, setViewCart] = useState(false);
  const [menuopen, setmenuopen] = useState(false);

  const location = useLocation();
  const data = useCart();

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
          <Link to="/" className="logo">
            Rama Mangoes
          </Link>

          <div className={`nav-links ${menuopen ? "open" : ""}`}>
            <Link className={isActive("/") ? "active" : ""} to="/">
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <a
                  onClick={() => setViewCart(true)}
                  style={{ cursor: "pointer", position: "relative" }}
                  className="cart-btn"
                >
                  <FaShoppingCart size={20} />
                  {data.length > 0 && (
                    <span className="cart-badge">{data.length}</span>
                  )}
                </a>

                <Link
                  className={isActive("/profile") ? "active" : ""}
                  to="/profile"
                >
                  Profile
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
                <Link
                  className={isActive("/signup") ? "active" : ""}
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className={isActive("/login") ? "active" : ""}
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          
            <button
              className="menu-toggle"
              onClick={() => setmenuopen((prev) => !prev)}
            >
              ☰
            </button>
        </div>
      </nav>
      <Modal isOpen={ViewCart} onClose={() => setViewCart(false)}>
        <Cart />
      </Modal>
    </>
  );
}
