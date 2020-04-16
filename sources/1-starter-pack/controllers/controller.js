const Model = require('../models/model');

class Controller {
  static showSeason(req, res) {
    Model.getSeason()
      .then((data) => { res.json(data); })
      .catch((err) => { res.end(err); });
  }

  static showAnime(req, res) {
    Model.getAnime()
      .then((data) => { res.json(data); })
      .catch((err) => { res.end(err); });
  }
}

module.exports = Controller;