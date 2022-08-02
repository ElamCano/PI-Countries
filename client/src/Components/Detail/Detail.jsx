import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, restartDetail } from "../../Redux/Actions";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const selectCountry = useSelector((state) => state.detail);
  /*  function handleClick() {
    history.push("/countries");
  } */
  return (
    <div key={selectCountry.id} className={styles.container}>
      {/* <button onClick={handleClick}>Go Back</button> */}
      <div className={styles.detailContainer}>
        {selectCountry ? (
          <div>
            <h1>{`${selectCountry.name} (${selectCountry.id})`}</h1>
            <img
              className={styles.imgDetail}
              src={selectCountry.img}
              alt="Imagen no encontrada"
              width="400px"
              height="300px"
            />
            <div>
              <div className={styles.infoDetail}>
                <h3>Capital: {selectCountry.capital}</h3>
                <h3>Region: {selectCountry.continent}</h3>
                <h3>Subregion: {selectCountry.subregion}</h3>
                <h3>Area: {selectCountry.area} km2</h3>
                <h3>Population: {selectCountry.population}</h3>
              </div>
            </div>
            <div>
              <div className={styles.activitiesDetail}>
                {selectCountry.Activities && selectCountry.Activities.length ? (
                  selectCountry.Activities.map((el) => {
                    return (
                      <div className={styles.activity} key={el.name}>
                        <Link to="/activities">
                          <h4>Tourist Activity</h4>
                        </Link>
                        <div>
                          <p>{el.name}</p>
                          <p>Difficulty: {el.dificulty}</p>
                          <p>Duration: {el.duration}</p>
                          <p>Season: {el.season}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span>No activities yet</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p> Loading... </p>
          </div>
        )}
      </div>
    </div>
  );
}
