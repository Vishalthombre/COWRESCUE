import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="cow-logo">🐄</span>
          <span className="brand-text">Cow Rescue</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <span className="nav-text">For Organization</span>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
