import axios from "axios";

export const getCountries = function () {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
};

export const filterByRegion = function (payload) {
  return {
    type: "FILTER_BY_REGION",
    payload,
  };
};

export const activitiesAvailable = function (payload) {
  return async (dispatch) => {
    let response = await axios.get("http://localhost:3001/countries");
    if (payload === "All") {
      return dispatch({
        type: "ACTIVITIES_AVAILABLE",
        payload: response.data,
      });
    }
    const response2 = await response.data.filter(
      (c) => c.Activities.filter((e) => e.name === payload).length
    );
    //osino te traigo los que tienen la activity del payload
    return dispatch({
      type: "ACTIVITIES_AVAILABLE",
      payload: response2,
    });
  };
};

export const orderByName = function (payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
};

export const orderByPopulation = function (payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
};

export const getNameCountry = function (country) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/countries?name=${country}`
      );
      return dispatch({
        type: "GET_NAME_COUNTRY",
        payload: response.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
};

export const getDetail = function (id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function restartDetail() {
  return (dispatch) => {
    dispatch({ type: "RESET_DETAIL" });
  };
}

export const postActivitie = function (payload) {
  console.log(payload);
  return async function (dispatch) {
    await axios.post("http://localhost:3001/activities", payload);
    return dispatch({ type: "POST_ACTIVITY" });
  };
};
