var booksModel = require('../models/books')
var ObjectId = require('mongodb').ObjectID;

var createBook = function (req,res) {
  booksModel.MongoClient.connect(booksModel.url, function (err,db) {
    if (err) {
      res.status(500).send("error creating", err)
    } else {
      db.collection('books').insertOne({
        isbn : req.body.isbn,
        title : req.body.title,
        author : req.body.author,
        category : req.body.category,
        stock : req.body.stock
      })
      .then(function (result) {
        res.send(result)
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  })
}

var getAll = function (req,res) {
  booksModel.MongoClient.connect(booksModel.url, function (err,db) {
    if (err) {
      res.send(err)
    } else {
      db.collection('books')
      .find()
      .toArray(function (err,result) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(result)
        }
      })
    }
  })
}

var updateBook = function (req,res) {
  booksModel.MongoClient.connect(booksModel.url, function (err,db) {
    if (err) {
      res.send(err)
    } else {
      db.collection('books')
      .find({
        _id : ObjectId(req.params.id)
      })
      .toArray(function (err,resultFind) {
        if (err) {
          res.status(500).send(err)
        } else {
          db.collection('books')
          .updateOne({
            _id : ObjectId(req.params.id)
          }, {
            isbn : req.body.isbn || resultFind[0].isbn,
            title : req.body.title || resultFind[0].title,
            author : req.body.author || resultFind[0].author,
            category : req.body.category || resultFind[0].category,
            stock : req.body.stock || resultFind[0].stock
          }, function (err,doc) {
            if (err) {
              res.status(500).send(err)
            } else {
              res.send(doc)
            }
          })
        }
      })
    }
  })
}

var deleteBook = function (req,res) {
  booksModel.MongoClient.connect(booksModel.url, function (err,db) {
    if (err) {
      res.status(500).send(err)
    } else {
      db.collection('books')
      .findOneAndDelete({
        _id : ObjectId(req.params.id)
      },function (err,ids) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(ids)
        }
      })
    }
  })
}

module.exports = {
  createBook,
  getAll,
  updateBook,
  deleteBook
};
