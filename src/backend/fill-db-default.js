//we will fill the db will some default values to see how it goes
console.log("filling the db with some default values");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('index-price.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stock database.');
  });

let data = [5000, 15000, 38000, 12];
let sql = `INSERT INTO previousClosePercentage(sp500, nasdaq, dow30, vix) VALUES(?, ?, ?, ?)`;

db.run(sql, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row inserted with rowid ${this.lastID}`);
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
