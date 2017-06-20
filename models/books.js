const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/books-2';

module.exports = {
  MongoClient,
  url
};
