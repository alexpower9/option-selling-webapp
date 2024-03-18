//Just use this to see the values of the tables at a given time to see how things are going

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('index-price.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stock database.');
  });

  let sql = 'SELECT * FROM previousClosePercentage';

  db.each(sql, (err, row) => {
    if (err) {
      throw err;
    }
    console.log(row);
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });