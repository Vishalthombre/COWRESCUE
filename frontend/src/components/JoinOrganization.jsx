import React from "react";
import { Link } from "react-router-dom";
import "./JoinOrganization.css";

const JoinOrganization = () => {
  return (
    <div className="join-container">
      <h1>Join as Organization</h1>
      <p>Register your organization to participate in rescue efforts.</p>

      {/* Login & Register buttons only on this page */}
      <div className="auth-buttons">
        <Link to="/login" className="auth-btn">Login</Link>
        <Link to="/register" className="auth-btn">Register</Link>
      </div>
    </div>
  );
};

export default JoinOrganization;
