"use strict"
const fs = require('fs').promises;

const mapSeasonId = (arr, seasonId, ctr) => {
  return JSON.parse(arr).anime.map(e => { 
    return { 
      mal_id: e.mal_id,
      episodes: e.episodes, 
      title: e.title, 
      url: e.url,
      season_id: seasonId
    }; 
  });
};

;(async () => {
  let arrResults = [];
  let ctr = 1;

  let spring2018 = await fs.readFile('./0a-anime-2018-spring.json', 'utf8');
  let summer2018 = await fs.readFile('./0b-anime-2018-summer.json', 'utf8');
  let autumn2018 = await fs.readFile('./0c-anime-2018-autumn.json', 'utf8');
  let winter2018 = await fs.readFile('./0d-anime-2018-winter.json', 'utf8');
  
  let spring2019 = await fs.readFile('./0e-anime-2019-spring.json', 'utf8');
  let summer2019 = await fs.readFile('./0f-anime-2019-summer.json', 'utf8');
  let autumn2019 = await fs.readFile('./0g-anime-2019-autumn.json', 'utf8');
  let winter2019 = await fs.readFile('./0h-anime-2019-winter.json', 'utf8');
  
  let spring2020 = await fs.readFile('./0i-anime-2020-spring.json', 'utf8');

  mapSeasonId(spring2018, 1).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(summer2018, 2).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(autumn2018, 3).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(winter2018, 4).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  
  mapSeasonId(spring2019, 5).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(summer2019, 6).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(autumn2019, 7).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });
  mapSeasonId(winter2019, 8).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });

  mapSeasonId(spring2020, 9).forEach(elem => { elem.id = ctr; ctr++; arrResults.push(elem) });

  await fs.writeFile('./0-animeProcessed.json', JSON.stringify(arrResults, null, 2), 'utf8');
})();