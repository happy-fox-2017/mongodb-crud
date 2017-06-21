const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/library';

const index = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/books', index);

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  app.locals.db = db;
  app.listen(3000);
});
