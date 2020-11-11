const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3006;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//connect DB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jokesdb',
});

// GET / Get all jokes.
app.get('/', (req, res) => {
  connection.query('SELECT * FROM `joke`', function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});

// POST / Add new joke.
app.post('/', (req, res) => {
  connection.query(`INSERT INTO joke (jokes) VALUES (?)`, [req.body.jokes], function (err, results) {
    if (!err) {
      res.send(req.body.jokes);
    } else {
      res.send(err);
    }
  });
});

// GET /:id Get joke by id.
app.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM joke WHERE joke_id = ${req.params.id}`, function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});

// DELETE /:id Delete joke. (In case you hate it)
app.delete('/:id', (req, res) => {
  connection.query(`DELETE FROM joke WHERE joke_id = ${req.params.id}`, function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});

// POST /:id/like Like a joke. (Because we don't have authentication system yet. Like spaming is fine here.)
app.post('/:id/like', (req, res) => {
  connection.query(`UPDATE joke SET like_status='1' WHERE joke_id = ${req.params.id}`, function (err, results) {
    if (!err) {
      res.status(200).send('ok');
    } else {
      res.send(err);
    }
  });
});

// POST /:id/dislike Dislike a joke. (Same as above. Dislike spaming is fine here.)
app.post('/:id/dislike', (req, res) => {
  connection.query(`UPDATE joke SET like_status='2' WHERE joke_id = ${req.params.id}`, function (err, results) {
    if (!err) {
      res.status(200).send('ok');
    } else {
      res.send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
