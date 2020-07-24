'use strict';
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/0-seasonProcessed.json'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    data.map(elem => {
      elem.createdAt = new Date();
      elem.updatedAt = new Date();

      return elem;
    });

    return queryInterface.bulkInsert('Seasons', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Seasons', null, {});
  }
};
