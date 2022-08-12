const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case "GET_NAME_COUNTRY":
      return {
        ...state,
        countries: action.payload,
      };

    case "FILTER_BY_REGION":
      const allCountries = state.allCountries;
      const regionFilter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: regionFilter,
      };

    case "ACTIVITIES_AVAILABLE":
      return {
        ...state,
        countries: action.payload,
      };

    case "ORDER_BY_NAME":
      let ordenedCountries =
        action.payload === "Asc"
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: ordenedCountries,
      };

    case "ORDER_BY_POPULATION":
      let population =
        action.payload === "Low"
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            });
      return {
        ...state,
        countries: population,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "POST_ACTIVITY":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
