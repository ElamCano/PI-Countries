import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNameCountry } from "../../Redux/Actions";
import style from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setCurrentPage(1);
    setCountry(e.target.value);
    dispatch(getNameCountry(country));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getNameCountry(country));
    setCountry("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => handleInput(e)}
          value={country}
          className={style.search}
        ></input>
        <input type="submit" value="search" className={style.button} />
      </form>
    </div>
  );
}
