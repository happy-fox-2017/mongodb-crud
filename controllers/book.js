'use strict'
const express = require('express');
const db = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/library2';

var methodes = {};

methods.create = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong on connection',
        error: err
      })
    } else {
      let body = req.body
      db.collection('books').insertOne({
        isbn: body.isbn,
        title: body.title,
        author: body.author,
        category: body.category,
        stock: Number(body.stock)
      }, (err, result)=>{
        if(err){
          res.status(400).send({
            msg: 'something wrong on getting query',
            error: err
          })
        } else {
          res.status(200).send({
            msg: 'creating new data is success!',
            data: result
          })
          dbase.close();
        }
      })
    }
  })
}

methods.show = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong with connection',
        error: err
      })
    } else {
      db.collection('books').find({}).toArray((err, result)=>{
        if(err){
          res.status(400).send({
            msg: 'something wrong while querying data',
            error: err
          })
        } else {
          res.status(200).send(result)
          dbase.close()
        }
      })
    }
  })
}
methods.showOne = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong while connecting to database',
        error: err
      })
    } else {
      db.collection('books').find({
        _id: ObjectID(req.params.id)
      })
      .toArray((err, result)=>{
        if(err){
          res.status(400).send({
            msg: 'something wrong while querying data',
            error: err
          })
        } else {
          res.status(200).send(result)
        }
      })
    }
  })
}
// methods.update = function(req, res){
//   db.connect(url, (err, dbase)=>{
//     if(err){
//       res.status(500)
//     }
//   })
// }
