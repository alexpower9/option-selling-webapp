const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('index-price.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the stock database.');
});

// Create a new table
db.run(`CREATE TABLE previousClosePercentage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sp500 REAL,
  nasdaq REAL,
  dow30 REAL,
  vix REAL
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Table created.');
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});