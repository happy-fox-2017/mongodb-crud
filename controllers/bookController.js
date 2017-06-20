
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/library'

var getAll = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    db.collection('books').find({}, (err, books) => {
      books.forEach(book => {
        res.json(book);
      })
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
    db.collection('books').findOne(query, (err, book) => {
      if (err) throw err
      res.json(book);
    })
    db.close()
  })
}

var create = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    db.collection('books').insertOne({
      "isbn" : "978-1-60309-666",
      "title" : "Nafkah kamu nafkah aku juga",
      "author" : "Penyair",
      "catergory" : "Fiksi Kamu",
      "stock" : 5
    }, (err, row) => {
      if (err) {throw err}
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
    let newValues = {title : 'Pujangga mencari cinta kamu', author : 'Aku dan kamu'}
    db.collection('books').update(query, newValues, (err,book) => {
      if (err) throw err
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
    db.collection('books').remove(query, (err, book) => {
      if (err) throw err
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
