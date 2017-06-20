var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var index = require('./routes/index');
var books = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/books', users);


module.exports = app;
