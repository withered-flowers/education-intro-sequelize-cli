'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    
    static associate(models) {
      
    }
  };
  Anime.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    episodes: DataTypes.STRING,
    // Tambahkan ini
    season_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};