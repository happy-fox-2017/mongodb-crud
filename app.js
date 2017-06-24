var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')

var index = require('./routes/index');
var books = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/books', books);


module.exports = app;
