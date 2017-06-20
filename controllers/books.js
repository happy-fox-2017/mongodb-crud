var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/crud_mongodb";

//test connection
MongoClient.connect(url, function(err, db) {
  console.log("connection success");

});

var add = function(req, res) {
  let isbn = req.body.isbn
  let title = req.body.title
  let author = req.body.author
  let category = req.body.category
  let stock = req.body.stock
  MongoClient.connect(url, function(err, db) {
  var objData = { isbn : isbn, title: title, author: author, category : category, stock : stock };
  if (err) throw err;
    db.collection("books").insertOne(objData, function(err, result) {
     if (err) throw err;
     res.send(result.result.n + " record inserted")
     db.close();
    });
  })
}

var getAll = function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection("books").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
}

var getById = function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let id = ObjectID(req.params._id)
    db.collection("books").find({_id:id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
}

var remove = function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let id = ObjectID(req.params._id)
  console.log('id--> ',id);
  var myquery = { _id: id };
    db.collection("books").remove(myquery, function(err, obj) {
      if (err) throw err;
      res.status(200).send(obj.result.n + " document(s) deleted")
      console.log(obj.result.n + " document(s) deleted");
      db.close();
    });
  });
}

var edit = function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection("books").findOne({_id: ObjectID(req.params._id)}, function(err, obj) {
    if (err) throw err;
      var myquery = { isbn : obj.isbn,
                      title: obj.title,
                      author: obj.author,
                      category : obj.category,
                      stock : obj.stock };
      var newvalues = { isbn : req.body.isbn || obj.isbn,
                        title: req.body.title || obj.title,
                        author: req.body.author || obj.author,
                        category : req.body.category || obj.category,
                        stock : req.body.stock || obj.stock};
        db.collection("books").update(myquery, newvalues, function(err, done) {
          if (err) throw err;
          res.status(200).send(done.result.nModified + " record updated")
          console.log(done.result.nModified + " record updated");
          db.close();
        });
    });
  })

}

module.exports = {
  add,
  getAll,
  remove,
  getById,
  edit
}
