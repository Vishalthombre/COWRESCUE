import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <span className="cow-logo">🐄</span>
          <span className="brand-text">Home</span>
        </Link>

        {/* Menu Toggle Button (Only on Small Screens) */}
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Navbar Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/news" className="nav-link" onClick={() => setMenuOpen(false)}>News</Link>
          <Link to="/join" className="nav-link" onClick={() => setMenuOpen(false)}>Join as Organization</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
