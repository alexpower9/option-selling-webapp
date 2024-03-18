const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Open the database connection
let db = new sqlite3.Database('./index-price.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/api/:column', (req, res) => {
  let sql = `SELECT ${req.params.column} FROM previousClosePercentage ORDER BY rowid DESC LIMIT 1`;

  db.get(sql, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(row);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});