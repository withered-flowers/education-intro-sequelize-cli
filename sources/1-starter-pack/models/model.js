const pool = require('../connection/config');

class Season {
  constructor(id, season_year, season_name) {
    this.id = id;
    this.season_year = season_year;
    this.season_name = season_name;
  }
}

class Anime {
  constructor(id, title, episodes, url, season_id) {
    this.id = id;
    this.title = title;
    this.episodes = episodes;
    this.url = url;
    this.season_id = season_id;
  }
}

class Model {
  static getSeason() {
    return new Promise((resolve, reject) => {
      const querySeason = `SELECT id, season_name, season_year FROM "Seasons"`;

      pool.query(querySeason)
        .then((data) => {
          data = data.rows.map(elem => {
            return new Season(elem.id, elem.season_name, elem.season_year);
          });

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getAnime() {
    return new Promise((resolve, reject) => {
      const queryAnime = 
        `SELECT id, title, episodes, url, season_id FROM "Animes" ORDER BY id LIMIT 50`;

      pool.query(queryAnime)
        .then((data) => {
          data = data.rows.map(elem => {
            return new Anime(elem.id, elem.title, elem.episodes, elem.url, elem.season_id);
          });

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }
}

module.exports = Model;