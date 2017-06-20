var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/library";
var ObjectID = require('mongodb').ObjectID

function createBooksCollections(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("books", function(err, response) {
    if (err) throw err;
    res.send("Table created!");
    db.close();
    });
  });
}

function getAllBooks(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("books").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
    db.close();
    });
  });
}

function getOneBook(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let aidi = ObjectID(req.params.id)
  db.collection("books").findOne({ _id: aidi }, function(err, result) {
    if (err) throw err;
    res.send(result);
    db.close();
    });
  });
}

function createBook(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  }
  db.collection("books").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 record inserted");
    db.close();
    });
  });
}

function deleteBook(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let aidi = ObjectID(req.params.id)
  db.collection("books").remove({_id: aidi}, function(err, obj) {
    if (err) throw err;
    res.send(obj.result.n + " document deleted");
    db.close();
    });
  });
}

function updateBook(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let aidi = ObjectID(req.params.id)
  var myquery = { _id: aidi };
  var newvalues = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  };
  console.log(req.body);
  console.log(aidi);
  db.collection("books").update(myquery, newvalues, function(err, response) {
    if (err) throw err;
    console.log(response);
    res.send(response.result.nModified + " record updated");
    db.close();
    });
  });
}

module.exports= {
  createBooksCollections,
  getAllBooks,
  getOneBook,
  createBook,
  deleteBook,
  updateBook
}
