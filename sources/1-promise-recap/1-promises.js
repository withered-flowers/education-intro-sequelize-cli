const fs = require('fs');

const customBacaFile = (path, dataAwal) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      if (dataAwal == null) {
        dataAwal = [];
      }

      dataAwal.push(JSON.parse(data));

      resolve(dataAwal);
    });
  });
}

customBacaFile('file-a.json', null)
  .then(data => customBacaFile('file-b.json', data))
  .then(data => customBacaFile('file-c.json', data))
  .then(data => {
    console.log(`${data[0].key} ${data[1].key} ${data[2].key}`);
  })
  .catch(err => {
    console.error(err.stack);
  });