var express = require('express')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

var books = require('./routes/books')

app.use('/api/books', books)

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listen on port 3000");
  }
})

MongoClient.connect('mongodb://localhost:27017/books-2', function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to DB');
  }
});

module.exports = app;
