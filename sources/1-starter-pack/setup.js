const pool = require('./connection/config');

const queryDropSeason = `DROP TABLE IF EXISTS "Seasons"`;
const queryDropAnime = `DROP TABLE IF EXISTS "Animes"`;

const queryCreateSeason = 
  "CREATE TABLE IF NOT EXISTS \"Seasons\" (" +
  "   id SERIAL PRIMARY KEY," +
  "   season_year VARCHAR(4) NOT NULL," +
  "   season_name VARCHAR(100) NOT NULL" +
  ");";

const queryCreateAnime = 
  "CREATE TABLE IF NOT EXISTS \"Animes\" (" +
  "   id SERIAL PRIMARY KEY," +
  "   episodes INTEGER," +
  "   title VARCHAR(512)," +
  "   url VARCHAR(512)," +
  "   season_id INTEGER,"+
  "   FOREIGN KEY (season_id) REFERENCES \"Seasons\"(id)" +
  ");";

const errHandler = (err, pool) => {
  if(err) {
    console.error(err.stack);
  }
}

pool.query(queryDropAnime, (err, result) => {
  errHandler(err, pool);

  pool.query(queryDropSeason, (err, result) => {
    errHandler(err, pool);

    pool.query(queryCreateSeason, (err, result) => {
      errHandler(err, pool);

      pool.query(queryCreateAnime, (err, result) => {
        errHandler(err, pool);

        console.log("Database berhasil dibuat !");
        pool.end();
      })
    })
  });
});