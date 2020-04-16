'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    season_name: DataTypes.STRING,
    season_year: DataTypes.STRING
  }, {});
  Season.associate = function(models) {
    // associations can be defined here
  };
  return Season;
};