import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <div className="header">
      <div className="navbar">
        <Link to="/analytics">
          <div>Analytics</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
