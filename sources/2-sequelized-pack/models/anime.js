'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime = sequelize.define('Anime', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    episodes: DataTypes.STRING,
    // Tambahkan ini
    season_id: DataTypes.INTEGER
  }, {});
  Anime.associate = function(models) {
    // associations can be defined here
  };
  return Anime;
};