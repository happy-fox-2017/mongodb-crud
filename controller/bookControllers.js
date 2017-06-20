var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/library";
var ObjectId = require('mongodb').ObjectID;

let findAllBook = (req, res) =>{
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.status(500).send(err)
    }
    db.collection('book').find()
    .toArray(function(err, data) {
      if (err) {
        res.send(err)
      }
      res.send(data)
    })
  })
}

let createBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.status(500).send(err)
    }
    let body = req.body
    db.collection('book').insertOne({
      title : body.title,
      isbn : body.isbn,
      author : body.author,
      category : body.category,
      stock : body.stock
    }, function(err) {
      if (err) {
        res.send(err)
      }
      res.send('data inserted')
    })
  })
}

let deleteBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.status(500).send(err)
    }
    db.collection('book').remove({
      '_id': ObjectId(req.params.id)
    })
  })
}

let updateBook = (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let body = req.body
    if (err) {
      res.status(500).send(err)
    }
    db.collection('book').findOne({
      '_id': ObjectId(req.params.id)
    }, function(err, book) {
      console.log(req.body);
      db.collection('book').update({
        '_id': ObjectId(req.params.id)
      },{
        $set: {
          title : body.title || book.title,
          isbn : body.isbn || book.isbn,
          author : body.author || book.author,
          category : body.category || book.category,
          stock : body.stock || book.stock
        }
      }, function(err, data) {
        if (err) {
          res.send(err)
        }
        res.send('record updated!')
      })
    })
  })
}

module.exports = {findAllBook, updateBook, deleteBook, createBook};