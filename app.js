'use strict'

const express = require('express'),
      // path = require('path'),
      bodyParser = require('body-parser'),

      index = require('./routes/index'),
      // books = require('./routes/books'),

      app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use('/', index)

app.listen(3000, () => {
  console.log('server connected');
})
module.exports = app;