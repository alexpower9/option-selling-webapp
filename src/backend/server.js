const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());
app.get('/api/:column', (req, res) => {
    let db = new sqlite3.Database('./src/backend/index-price.db', sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  
    let sql = `SELECT ${req.params.column} FROM previousClosePercentage ORDER BY rowid DESC LIMIT 1`;
  
    db.get(sql, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      db.close();
      res.send(row);
    });
  });

  app.post('/api/:column', (req, res) => {
    let db = new sqlite3.Database('./src/backend/index-price.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  
    let sql = `SELECT * FROM previousClosePercentage ORDER BY id DESC LIMIT 1`;
  
    db.get(sql, [], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
  
      let newRow = {
        sp500: row ? row.sp500 : null,
        nasdaq: row ? row.nasdaq : null,
        dow30: row ? row.dow30 : null,
        vix: row ? row.vix : null,
      };
  
      newRow[req.params.column] = req.body.data;
  
      sql = `INSERT INTO previousClosePercentage(sp500, nasdaq, dow30, vix) VALUES(?, ?, ?, ?)`;
  
      db.run(sql, [newRow.sp500, newRow.nasdaq, newRow.dow30, newRow.vix], function(err) {
        if (err) {
          return console.error(err.message);
        }
        db.close();
        res.send({ message: `A row has been inserted with rowid ${this.lastID}` });
      });
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });