'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Season.init({
    season_name: DataTypes.STRING,
    season_year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Season',
  });
  return Season;
};