import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ countries }) => {
  return (
    <div className="cards">
      {countries?.map((e) => {
        return (
          <Card name={e.name} image={e.img} region={e.continent} key={e.id} />
        );
      })}
    </div>
  );
};

export default Cards;
