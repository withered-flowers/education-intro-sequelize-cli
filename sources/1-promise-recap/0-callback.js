const fs = require('fs');

fs.readFile('file-a.json', 'utf8', function readHandler(err, data1) {
  if (err) {
    console.error(err.stack);
  }

  fs.readFile('file-b.json', 'utf8', function readHandler2(err, data2) {
    if (err) {
      console.error(err.stack);
    }

    fs.readFile('file-c.json', 'utf8', function readHandler3(err, data3) {
      data1 = JSON.parse(data1);
      data2 = JSON.parse(data2);
      data3 = JSON.parse(data3);

      console.log(`${data1.key} ${data2.key} ${data3.key}`);
    });
  })
});