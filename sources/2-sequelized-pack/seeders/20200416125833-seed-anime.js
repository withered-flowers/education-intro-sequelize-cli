'use strict';
let data = require('../data/0-animeProcessed.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    let objects = data.map(elem => {
      let obj = {
        id: elem.id,
        title: elem.title,
        url: elem.url,
        episodes: elem.episodes,
        season_id: elem.season_id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return obj;
    });

    return queryInterface.bulkInsert('Animes', objects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Animes', null, {});
  }
};
