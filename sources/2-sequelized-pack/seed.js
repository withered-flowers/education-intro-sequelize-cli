const fs = require('fs');

const pool = require('./connection/config');

fs.readFile('./data/0-seasonProcessed.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err.stack);
  }

  const textSeasons =
    "INSERT INTO \"Seasons\" (id, season_year, season_name) VALUES ($1,$2,$3)";

  const seasons = JSON.parse(data);

  for (const season of seasons) {
    let values = [season.id, season.season_year, season.season_name];

    pool.query(textSeasons, values, (err, result) => {
      if (err) {
        console.error(err.stack);
      }
    });
  }

  fs.readFile('./data/0-animeProcessed.json', 'utf8', (err, data) => {

    const textAnimes =
      "INSERT INTO \"Animes\" (id, episodes, title, url, season_id) " +
      "VALUES ($1, $2, $3, $4, $5)";

    const animes = JSON.parse(data);

    for(const anime of animes) {
      let values = [anime.id, anime.episodes, anime.title, anime.url, anime.season_id];

        pool.query(textAnimes, values, (err, result) => {
          if(err) {
            console.log(anime);
            console.error(err.stack);
          }
        })
    }
  });
});