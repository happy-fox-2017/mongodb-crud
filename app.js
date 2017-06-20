const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/library2';

MongoClient.connect(url, function(err, db){
  if(err){
    console.log('cannot connect to database', err);
  }
  console.log('connected to database on port 27017');
  db.close();
});

var book = require('./routes/book');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', book);

app.listen(3000, ()=>{
  console.log('app listen on port 3000');
});

module.exports = app;
