
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var theCollection = "books"
var url = 'mongodb://localhost:27017/library'
var status = 400
var body = "error 404"

var getAll = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    if (err) {res.send(err)}
    db.collection(theCollection).find({}).toArray((err, books) => {
      res.send(books);
    })
    db.close()
  })
}

var getOne = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    let id = ObjectID(req.params)
    let queryId = {_id : id}
    let queryTitle = {
        title : {
        $regex : /puj/i
      }
    }
    db.collection(theCollection).findOne(queryId, (err, book) => {
      if (err) res.status(status).send(body)
      res.json(book);
    })
    db.close()
  })
}

var create = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    db.collection(theCollection).insertOne({
      "isbn" : req.body.isbn,
      "title" : req.body.title,
      "author" : req.body.author,
      "category" : req.body.category,
      "stock" : req.body.stock
    }, (err, row) => {
      if (err) res.status(status).send(req.body)
      else {res.send(row)}
    })
    db.close()
  })
}


var update = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    if (err) {
      console.log(err);
    }
    console.log('connect to server success');
    let query = {_id : ObjectID(req.params.id)}
    let newValues = {
      "isbn" : req.body.isbn,
      "title" : req.body.title,
      "author" : req.body.author,
      "category" : req.body.category,
      "stock" : req.body.stock
    }
    db.collection(theCollection).update(query, newValues, (err,book) => {
      if (err) res.status(status).send(body)
      res.send(book.result.nModified + "record updated");
      db.close()
    })
  })
}

var remove = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    let id = ObjectID(req.params.id)
    let query = {_id : id}
    if (err) throw err
    console.log(`Connected to server`);
    db.collection(theCollection).remove(query, (err, book) => {
      if (err) res.status(status).send(body)
      res.send(book.result.n + "deleted");
      db.close()
    })
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}
