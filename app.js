const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('Mongodb').MongoClient;
var url = 'mongodb:/localhost:27017/library2';

db.connect(url, function(err, dbase){
  if(err){
    console.log({
      msg: 'something wrong on connect to database',
      error: err
    })
  }
  console.log('connected to database on port 27017');
  dbase.close();
});

var book = require('./routes/book');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', book);

app.listen(3000);

module.exports = app;
