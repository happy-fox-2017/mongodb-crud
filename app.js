const express = require('express')
const app = express()
var bodyParser = require('body-parser')

var MongoClient =  require('mongodb').MongoClient

var books = require('./routes/books')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

var url = 'mongodb://localhost/mongodb-crud';

app.use('/books', books);

app.listen(3000, ()=>{
     console.log('alive');
})

module.exports = app;
