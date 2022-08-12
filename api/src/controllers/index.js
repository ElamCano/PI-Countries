const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");
const { getActivities } = require("../unionDB/unionDB");
module.exports = {
  //trae todos los paises o por query
  getAllCountries: async (req, res, next) => {
    const { name } = req.query;
    try {
      if (name) {
        let countryFound = await Country.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
          },
          include: Activity,
        });
        if (!countryFound[0]) {
          res.status(404).send(`No country found with the search '${name}'`);
        }
        return res.status(200).json(countryFound);
      }
      const allCountries = await Country.findAll({ include: Activity });
      res.status(200).send(allCountries);
    } catch (error) {
      next(error);
    }
  },
  //trae por code
  getByCode: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (id) {
        const country = await Country.findOne({
          where: {
            id: id.toUpperCase(),
          },
          include: Activity,
        });
        return res.status(200).json(country);
      }
    } catch (error) {
      next(error);
    }
  },
  //postea una actividad turistica
  postActivity: async (req, res, next) => {
    try {
      const { name, dificulty, duration, season, countriesId } = req.body;
      const exist = await Activity.findOne({
        where: {
          name: name,
        },
      });

      if (!exist) {
        const createActivity = await Activity.create({
          name,
          dificulty,
          duration,
          season,
          countriesId,
        });
        const countries = await Country.findAll({
          where: {
            id: countriesId,
          },
        });
        createActivity.addCountry(countries);
        res.status(200).send(createActivity);
      } else {
        const countries = await Country.findAll({
          where: {
            id: countriesId,
          },
        });
        exist.addCountry(countries);
        res.status(200).send(exist);
      }
    } catch (error) {
      next(error);
    }
  },
  //trae las actividades creadas
  getActivity: async (req, res) => {
    const activities = await getActivities();
    res.status(200).send(activities);
  },
};
