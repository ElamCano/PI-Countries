import axios from "axios";

export const getCountries = function () {
  return async function (dispatch) {
    try {
      let response = await axios.get("/countries");
      return dispatch({
        type: "GET_COUNTRIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* export const getCountries = function () {
  return function (dispatch) {
    return fetch("/countries")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "GET_COUNTRIES", payload: data }))
      .catch((e) => console.log(e));
  };
}; */

export const filterByRegion = function (payload) {
  return {
    type: "FILTER_BY_REGION",
    payload,
  };
};

export const activitiesAvailable = function (payload) {
  return async (dispatch) => {
    let response = await axios.get("/countries");
    if (payload === "All") {
      return dispatch({
        type: "ACTIVITIES_AVAILABLE",
        payload: response.data,
      });
    }
    const response2 = await response.data.filter(
      (c) => c.Activities.filter((e) => e.name === payload).length
    );
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
      let response = await axios.get(`/countries?name=${country}`);
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
      var response = await axios.get(`/countries/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postActivitie = function (payload) {
  return async function (dispatch) {
    await axios.post("/activities", payload);
    return dispatch({ type: "POST_ACTIVITY" });
  };
};
