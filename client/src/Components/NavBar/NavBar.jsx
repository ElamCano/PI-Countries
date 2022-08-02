import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import picture from "./53df31770f5c587ecaecffcd6c16eefb.jpg";
export default function NavBar() {
  return (
    <div className="navContainer">
      <Link className="image" to="/countries">
        <img src={picture} width="100px" />
      </Link>
      <Link className="act" to="/activities">
        Create Activity
      </Link>
    </div>
  );
}
