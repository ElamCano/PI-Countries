import { Link } from "react-router-dom";
import React from "react";
import "./Card.css";
export default function Card({ name, image, region, id }) {
  return (
    <Link to={`/countries/${id}`} className="card">
      <div className="container">
        <h2>{name}</h2>
        <h4 className="region">Region: {region}</h4>
      </div>
      <div className="imgContainer">
        <img className="img" src={image} alt="" />
      </div>
    </Link>
  );
}
