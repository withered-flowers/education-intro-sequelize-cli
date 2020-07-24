const Model = require('../models/index');

class Controller {
  static showSeason(req, res) {
    Model.Season.findAll({})
      .then((data) => { res.json(data); })
      .catch((err) => { res.end(err); });
  }

  static showAnime(req, res) {
    Model.Anime.findAll({})
      .then((data) => { res.json(data); })
      .catch((err) => { res.end(err); });
  }
}

module.exports = Controller;