'use strict'
const express = require('express');
const db = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/library2';

var methods = {};

methods.create = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong on connection',
        error: err
      })
    } else {
      let body = req.body
      dbase.collection('books').insertOne({
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
      dbase.collection('books').find({}).toArray((err, result)=>{
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
      dbase.collection('books').find({
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
          dbase.close()
        }
      })
    }
  })
}

methods.update = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong while connecting to database',
        error: err
      })
    } else {
      dbase.collection('books').updateOne({
        _id: ObjectID(req.params.id)
      }, {
        $set: {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.params.author,
          category: req.params.category,
          stock: Number(req.body.stock)
        }
      }, {new: true}, (err, result)=>{
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

methods.delete = function(req, res){
  db.connect(url, (err, dbase)=>{
    if(err){
      res.status(500).send({
        msg: 'something wrong while connecting to database',
        error: err
      })
    } else {
      dbase.collection('books').deleteOne({
        _id: ObjectID(req.params.id)
      }, (err, result)=>{
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

module.exports = methods;
