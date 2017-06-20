var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/library";

let getAllBooks = (req,res)=>{
  MongoClient.connect(url, (err, db)=> {
    if (err) {
      res.send(err)
    }
    db.collection("books").find({}).toArray((err, result)=> {
      if (err) {
        res.send(err)
      }
      console.log(result);
      res.send(result)
      db.close();
  });
});
}

let createBook = (req,res)=>{
  MongoClient.connect(url,(err,db)=>{
    if (err) {
      res.send(err)
    }
    db.collection("books").insertOne({
      isbn : req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    },(err,result)=>{
      if (err) {
        res.send(err)
      }
      console.log(result);
      res.send(result)
      db.close();
    })
  })
}

module.exports = {
  getAllBooks,
  createBook
}; 