import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import picture from "./imgbin_world-earth-globe-cartoon-png.png";
export default function NavBar() {
  return (
    <div className="navContainer">
      <Link className="cont" to="/countries">
        <figure className="image">
          <img src={picture} width="80px" alt="" />{" "}
        </figure>
      </Link>
      <Link className="act" to="/activities">
        Create Activity
      </Link>
    </div>
  );
}
