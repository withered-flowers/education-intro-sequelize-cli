const express = require('express');
const Controller = require('./controllers/controller');

const app = express();

const PORT = 3000;

app.get('/season', Controller.showSeason);
app.get('/anime', Controller.showAnime);

app.listen(PORT, () => {
  console.log(`Open in port ${PORT}`);
});