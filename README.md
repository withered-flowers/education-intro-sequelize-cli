## Table of Content
1. [Recap Promises](#recap-promises)
1. [Intro to ORM](#intro-to-orm)
1. [What is sequelize](#what-is-sequelize)
1. [How to get the starter pack](#how-to-get-the-starter-pack)
1. [How to use sequelize](#how-to-use-sequelize)

## Recap Promises
Pada pembelajaran kali ini, kita akan mengulang kembali apa itu "Janji" a.k.a `Promise`. 
`Promise` pada ES6 merupakan pengembangan dari `callback` dan merupakan salah satu dari 
solusi untuk mengatasi `callback hell`.

Misalnya kita memiliki kode sebagai berikut

### Code 1
```javascript
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
```

(Kode di atas juga dapat dilihat di [sini](https://github.com/withered-flowers/education-intro-sequelize-cli/tree/master/sources/1-promise-recap))

Dari kode di atas, dapat dilihat bahwa bila semakin banyak urutan callback yang 
dibutuhkan, maka kodingan kita akan menjorok ke dalam sangat banyak sehingga makin
`prone-to-error` bukan?

Oleh karena itu, pada pengembangan NodeJS sendiri, kita bisa memanfaatkan `Promise`
untuk mengatasi hal tersebut.

(Untuk konsep promise tidak akan dibahas lebih mendalam karena sudah dibahas pada 
pertemuan sebelumnya yah !)

Sehingga apabila menggunakan `Promise`, kode di atas akan berubah menjadi

### Code 2
```javascript
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
```

## Intro to ORM
ORM atau `Object Relational Mapping` adalah suatu konsep dimana kita menuliskan query 
pada database selayaknya kita sedang menuliskan query dengan gaya 
`Object Oriented Programming` atau OOP.

Contoh sederhananya adalah (ingat ini konseptual yah !)
```
SQL:

SELECT * 
FROM Users
WHERE email = 'akuhanyalahtesting@email.com';

IMAGINARY ORM:

orm("Users").where({email: 'akuhanyalahtesting@email.com'});

```

Nah pada kesempatan ini kita akan belajar menggunakan salah satu ORM `promise-based` 
yang cukup populer dalam Javascript NodeJS, yaitu `sequelize`

## What is Sequelize
Sequelize (https://sequelize.org) merupakan `promise-based` ORM untuk database 
Postgres, MySQL, MariaDB, SQLite, dan SQLServer (namun, untuk pembelajaran ini yang) 
akan kita gunakan adalah untuk Postgres.

## How to get the starter pack
Untuk pembelajaran mengenai `sequelize`, kita akan menggunakan starter-pack dari 
kode sederhana berbasis express mengenai Anime list yang didapat dari API `jikan.moe` 
yang sudah dimodifikasi.

Starter-pack ini dapat dilihat di [sini](https://github.com/withered-flowers/education-intro-sequelize-cli/tree/master/sources/1-starter-pack)

## How to use Sequelize
INSTALASI
1. Install `sequelize-cli` sebagai `dev` package dengan  
   `npm install --save-dev sequelize-cli` -- ATAU --
1. [OPTIONAL] Install `sequelize-cli` as `global` package dengan  
   `npm install -g sequelize-cli`
1. Pada projek, install `sequelize` dengan  
   `npm install sequelize`
1. Sampai di sini selesai tahap INSTALASI.

INISIALISASI
1. Lakukan inisialisasi sequelize dengan  
   `npx sequelize-cli init`  
    Setelah melakukan langkah ini akan terbentuk beberapa file:
    1. Folder `config` file `config.json`, yang berfungsi untuk mengatur koneksi ke 
       database yang akan kita gunakan
    2. Folder `models` file `index.js`, dimana `sequelize` akan membaca semua model 
       yang nanti akan kita generate via `sequelize-cli`
    3. Folder `migrations`, yang akan digunakan untuk `versioning` perubahan table 
       pada database
    4. Folder `seeders`, yang akan digunakan untuk seeding data via `sequelize`
1. Ganti data pada `config/config.json` sesuai dengan credential dan database yang akan
   kita gunakan, pada config.json ini terdapat fleksibilitas penggunaan database 
   tergantung dari fase pengembangan aplikasi kita, namun karena kita di sini hanya 
   dalam fase belajar, gunakan yang `development` saja.
1. Jalankan pembuatan database dengan `npx sequelize-cli db:create`  
   Pada saat menjalankan perintah ini, apabila database sudah pernah dibuat 
   (*already exist*), bisa mem"buang" database nya dengan `npx sequelize-cli db:drop`
1. Langkah selanjutnya adalah membuat table. Untuk membuat "Table" dengan `sequelize` 
   bisa menggunakan `npx sequelize model:generate --name ... --attribute ...`  
   Contoh pada starter pack ini memiliki tabel sebagai berikut:
   * Season
      * id
      * season_name
      * season_year
   * Anime
      * id
      * title
      * url
      * episodes
      * season_id  
   * Maka sintaks yang harus dimasukkan dapat dilihat pada [Syntax 1](#syntax-1),
     bisa dilihat pada `--attributes` id tidak kita tuliskan dan tidak boleh ber-spasi !
   * Pada saat syntax ini dijalankan dapat terlihat 2 buah file
      * /models/[namamodel].js, berisi struktur data dari tabel yang dibuat
      * /migrations/[timestamp-Namamodel].js, yang berisi "cara" untuk create table 
        pada database yang digunakan
1. Apabila kita salah dalam membuat table (ada kolom yang kurang / perubahan kolom) 
   dapat menggunakan `npx sequelize-cli migrations:generate`, dan memodifikasi file 
   migration yang terbentuk dan memodifikasi file Model yang sudah ada. Contoh dapat 
   dilihat pada [Syntax 2](#syntax-2) dan [Code 3](#code-3). Perhatikan pada Code 3 
   kita memasukkan nama tabel dalam bentuk `plural`.
1. Sampai di sini, selesai tahap INISIALISASI.

### Syntax 1
```
# Buat model dan tabel Season

npx sequelize-cli model:generate --name Season --attributes season_name:string,season_year:string

# Buat model dan tabel Anime (minus season_id)

npx sequelize-cli model:generate --name Anime --attributes title:string,url:string,episodes:string
```

### Revision 1
Pada saat menggunakan `model:generate` ini, `sequelize-cli` akan membuat file pada folder 
`migrations` (untuk pembuatan tabel dalam database yang digunakan), dan `models` (untuk pembuatan
representasi data yang digunakan pada aplikasi yang akan dibuat), dengan menggunakan 
`async / await`, namun kita juga bisa merubahnya menjadi `promise` based dengan cara menghapus
seluruh kata `async` pada file **migration** yang dibentuk dan mengganti kata `await` menjadi
`return`

Contoh kode dapat dilihat di bawah ini:
```javascript
'use strict';
module.exports = {
  // Kata async ini dihapus
  // up: async (queryInterface, Sequelize) => {
  up: (queryInterface, Sequelize) => {
  // Kata await diganti return
    // await queryInterface.createTable('Seasons', {
      return queryInterface.createTable('Seasons', {
      ...
    });
  },
  // Kata async ini dihapus
  // down: async (queryInterface, Sequelize) => {
  down:  (queryInterface, Sequelize) => {
  // Kata await diganti return
    // await queryInterface.dropTable('Seasons');
    return queryInterface.dropTable('Seasons');
  }
};
```

### Syntax 2
```
# Buat migration file baru untuk menambahkan kolom

npx sequelize-cli migration:generate --name modify-anime
```

### Code 3
```javascript
// Pada file /migrations/[timestamp]-modifiy-anime.js
...
up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn('Animes', 'season_id', Sequelize.STRING, {});
},
down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('Animes', 'season_id', {});
}
...

```

```javascript
// Pada file /models/anime.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    
    static associate(models) {
      
    }
  };
  Anime.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    episodes: DataTypes.STRING,
    //Tambahkan ini
    season_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};
...

```

GENERATE DATA DUMMY
1. Setelah melakukan INISIALISASI, saatnya kita memasukkan data atau dikenal dengan
   istilah `seeding`.
1. Untuk melakukan `seeding` dapat dilakukan dengan perintah `npx sequelize-cli seed:
   generate [namafile]`, contoh sintaks dapat dilihat pada [Syntax 3](#syntax-3)
1. Setelah melakukan perintah di atas, akan terbentuk file di folder `seeders`
1. Kita dapat melakukan seeding di file tersebut. Contoh hasil seeding dapat dilihat
   pada [Code 4](#code-4)
1. Setelah kita selesai membuat semuanya, saatnya untuk EKSEKUSI file tersebut.

### Syntax 3
```
npx sequelize-cli seed:generate --name seed-season
npx sequelize-cli seed:generate --name seed-anime
```

### Code 4
```javascript
// File [timestamp]-seed-season.js
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

// File [timestamp]-seed-anime.js
'use strict';
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/0-animeProcessed.json'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    let objects = data.map(elem => {
      let obj = {
        id: elem.id,
        title: elem.title,
        url: elem.url,
        episodes: elem.episodes,
        season_id: elem.season_id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return obj;
    });

    return queryInterface.bulkInsert('Animes', objects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Animes', null, {});
  }
};

```

EKSEKUSI
1. Eksekusi pembuatan Model dan Table dengan `npx sequelize-cli db:migrate`
1. Eksekusi memasukkan data `seeding` dengan `npx sequelize-cli db:seed:all`
1. Apabila ada error pada pembuatan Model, bisa `mundur` dengan   
   `npx sequelize-cli db:migrate:undo`
1. Apabila ada error pada pembuatan data, bisa `mundur` dengan  
   `npx sequelize-cli db:seed:undo`

GUNAKAN PADA EXPRESS
1. Hapus file `models/model.js`
1. Modifikasi pada file `controllers/controller.js` menjadi seperti [Code 5](#code-5)
1. Jalankan `npx nodemon app.js` dan lihat hasilnya !

### Code 5
```javascript
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
```

Dari kode yang ada di atas, dapat diketahui bahwa dengan menggunakan `sequelize` kita 
tidak perlu membuat model sendiri lagi karena sudah di-generate oleh `sequelize`.

Hal ini dapat memudahkan kita dalam mengembangkan aplikasi web yang menggunakan database 
karena tidak perlu repot repot membuat raw-query nya lagi karena sudah di-handle oleh 
`sequelize`.

Namun hal ini juga bukan berarti tidak ada kelemahannya. Karena ORM ini dibuat oleh 
orang lain, kita harus mengikuti aturan atau dokumentasi yang sudah dibuat oleh si 
developer itu sendiri.

Selamat belajar !

## Reference
* [ORM What is - Bitsrc.io](#https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)
* [Sequelize - Migration](#https://sequelize.org/master/manual/migrations.html)