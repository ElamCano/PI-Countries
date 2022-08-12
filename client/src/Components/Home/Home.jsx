import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByRegion,
  orderByPopulation,
  activitiesAvailable,
  orderByName,
} from "../../Redux/Actions";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import Cards from "../Cards/Cards";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesInPage] = useState(10);
  const [, setOrder] = useState("");

  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesInPage - 1;
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesInPage;

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paging = (pageNum) => {
    setCurrentPage(pageNum);
  };

  let activ = [];
  allCountries?.map(
    (data) =>
      data.Activities.length &&
      data.Activities.map(
        (activity) => activity.name && activ.push(activity.name)
      )
  );

  let uniqueAct = activ.filter(function (act, index, array) {
    //aca los creo sin repetidos
    return array.indexOf(act) === index;
  });

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
  }
  function handleFilterRegion(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByRegion(e.target.value));
  }
  function handleOrderPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  function handleAct(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(activitiesAvailable(e.target.value));
  }
  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }
  return (
    <div className="ContainerAll">
      <div className="filterContainer">
        <button
          className="buttonrefresh"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh Countries
        </button>

        <select onChange={handleSortByName} className="button">
          <option value="">Select order</option>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>

        <select onChange={handleFilterRegion} className="button">
          <option value="All">Select region</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antartic</option>
        </select>
        <select onChange={handleOrderPopulation} className="button">
          {<option value="All">Population</option>}
          <option value="High">Higher Population</option>
          <option value="Low">Lower Population</option>
        </select>
        <select onChange={handleAct} className="button">
          <option value="All">All Activities</option>
          {uniqueAct?.map((act, index) => (
            <option key={index} value={act}>
              {act}
            </option>
          ))}
        </select>

        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <Cards countries={currentCountries} />
      <Paging
        countriesInPage={countriesInPage}
        allCountries={allCountries?.length}
        paging={paging}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
