import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div>
        <h1 className="Title">COUNTRIES</h1>
      </div>
      <Link to="/countries">
        <button className="Landingbutton">Start</button>
      </Link>
    </div>
  );
}
