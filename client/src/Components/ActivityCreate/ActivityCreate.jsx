import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivitie, getCountries } from "../../Redux/Actions";
import validation from "./Validation/Validation";
import style from "./ActivityCreate.module.css";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const [add, setAdd] = useState([]);
  const [error, setError] = useState({});
  const [inputActivity, setInputActivity] = useState({
    name: "",
    dificulty: 0,
    duration: 0,
    season: "",
    countriesId: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    setInputActivity({
      ...inputActivity,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...inputActivity,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleCheckbox(e) {
    if (e.target.checked) {
      setInputActivity({
        ...inputActivity,
        season: e.target.value,
      });
    }
    setError(
      validation({
        ...inputActivity,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputActivity.name === "" ||
      inputActivity.duration < 10 ||
      inputActivity.dificulty < 1 ||
      inputActivity.season === "" ||
      inputActivity.countriesId.length === 0
    )
      return alert("You must complete all fields");

    dispatch(postActivitie(inputActivity));
    alert("Activity created");
    setInputActivity({
      name: "",
      dificulty: 0,
      duration: 0,
      season: "",
      countriesId: [],
    });
    setAdd([]);
    history.push("/countries");
  }

  function handlerOnChangeCountries(e) {
    setAdd([...add, e.target.value]);
    setInputActivity({
      ...inputActivity,
      countriesId: [...inputActivity.countriesId, e.target.value],
    });
  }
  function handleDelete(country) {
    setInputActivity({
      ...inputActivity,
      countriesId: inputActivity.countriesId.filter((el) => el !== country),
    });
    console.log(inputActivity);
  }

  return (
    <div className={style.formulario}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name :</label>
          <input
            placeholder="Name"
            type="text"
            value={inputActivity.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className={style.error}>{error.name}</p>}
        </div>
        <div>
          <label>Difficulty :</label>
          <input
            type="range"
            max={5}
            value={inputActivity.dificulty}
            name="dificulty"
            onChange={handleChange}
          ></input>
          {error.dificulty && <p className={style.error}>{error.dificulty}</p>}
        </div>
        <div>
          <label>Duration :</label>
          <input
            type="number"
            value={inputActivity.duration}
            name="duration"
            onChange={handleChange}
            min={10}
            max={300}
          />
          {error.duration && <p className={style.error}>{error.duration}</p>}
        </div>
        <div>
          <label>Season :</label>
          <br />
          <label>
            <input
              type="radio"
              name="season"
              value="Winter"
              onChange={handleCheckbox}
            />
            Winter
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="Fall"
              onChange={handleCheckbox}
            />
            Fall
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="Spring"
              onChange={handleCheckbox}
            />
            Spring
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="Summer"
              onChange={handleCheckbox}
            />
            Summer
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="Autumn"
              onChange={handleCheckbox}
            />
            Autumn
          </label>
          {inputActivity.season === "" && (
            <p className={style.error}>{error.season}</p>
          )}
        </div>
        <div>
          <label>Select Countries</label>
          <br />
          <select onChange={handlerOnChangeCountries}>
            <option value={""}></option>
            {countries &&
              countries.map((e) => (
                <option value={e.id} key={e.id} img={e.img}>
                  {e.name}
                </option>
              ))}
          </select>
          {error.countriesId && (
            <p className={style.error}>{error.countriesId}</p>
          )}

          <div className={style.containerCountry}>
            {inputActivity.countriesId.map((country) => (
              <div className="" key={country}>
                <input
                  className={style.buttonEliminate}
                  type="button"
                  value="X"
                  onClick={() => handleDelete(country)}
                />
                <p className={style.country}>{country}</p>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div>
          <button type="submit" className={style.button}>
            Create Activity
          </button>
        </div>
      </form>
    </div>
  );
}
