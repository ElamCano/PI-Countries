const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dificulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        validate: {
          min: 10,
          max: 300,
        },
      },
      season: {
        type: DataTypes.ENUM("Summer", "Fall", "Winter", "Spring"),
      },
    },
    { timestamps: false }
  );
};
