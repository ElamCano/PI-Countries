const axios = require("axios");
const { Country, Activity } = require("../db");

const getAll = async (req, res, next) => {
  try {
    const CountriesApi = await axios.get("https://restcountries.com/v3/all");
    const model = await CountriesApi.data.map((e) => {
      return {
        name: e.name.common,
        id: e.cca3,
        img: e.flags[0],
        continent: e.region ? e.region : "No region",
        capital: e.capital ? e.capital[0] : "No Capital",
        subregion: e.subregion ? e.subregion : "No Subregion",
        area: parseInt(e.area),
        population: parseInt(e.population),
      };
    });

    model.forEach(async (e) => {
      await Country.findOrCreate({
        where: {
          name: e.name,
          id: e.id,
          img: e.img,
          continent: e.continent,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        },
      });
    });
  } catch (error) {
    next(error);
  }
};
const getActivities = async () => {
  const get = await Activity.findAll();
  return get;
};

module.exports = { getAll, getActivities };
