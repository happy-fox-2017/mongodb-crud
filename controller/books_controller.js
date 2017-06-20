var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/mongodb-crud';
var ObjectID = require('mongodb').ObjectId




module.exports = {
  findAllBooks,
  findOneBook,
  insertManyBook,
  DeleteBook,
  updateBook

}
