const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost/library";

let CreateDatabase = function(req,res){
        MongoClient.connect(url, function (err,db) {
            if(!err){
                console.log("Database Created");
                db.close();
            } else {
                res.status(503).send("Something Wrong With Your Connection Database"+err);
            }
        });
    };


let CreateTable = function(req,res) {
        MongoClient.connect(url, function (err,db) {
            if(err){
                res.status(501).send("Something Wrong with your Create Table");
            } else {
                db.createCollection("books",(err,result) =>{
                    if(!err){
                        console.log("Table books Created");
                        res.send(result);
                        db.close();
                    } else {
                        res.status(501).send("Something Wrong with your Create Table"+err);
                    }
                });
            }
        });
    };

let InsertData = function (req,res) {
    MongoClient.connect(url,(err,db) =>{
        if(err){
            res.status(503).send("Something Wrong With Your Connection Database");
        }else {
            let input = req.body;
            let databaru = {
                isbn: input.isbn,
                title: input.title,
                author: input.author,
                category: input.category,
                stock: input.stock
            };
            db.collection("books").insertOne(databaru, (err,result) =>{
                if(!err){
                    res.send("1 Records inserted" + result);
                    db.close();
                }else {
                    res.status(501).send("Something Wrong with your Create Table"+err);
                }
            })
        }
    })
};

let UpdateData = function (req,res) {
    MongoClient.connect(url, function (err,db) {
        if (err){
            res.status(503).send("Something Wrong With Your Connection Database");
        } else {
            let conditionQuery = { _id : ObjectID(req.params._id) };
            let input = req.body;
            let newData = {
                isbn : input.isbn,
                title: input.title,
                author: input.author,
                category: input.category,
                stock: input.stock
            };
            db.collection('books').updateOne(conditionQuery,newData, function (err, result) {
                if(err){
                    res.status(501).send("Something Wrong with your Update Data"+err);
                } else {
                    res.send(result);
                    db.close();
                }
            })
        }
    })
};

let findAllData = function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err){
            res.status(503).send("Something Wrong With Your Connection Database");
        } else{
            db.collection("books").find({}).toArray(function(err, result) {
                if(err){
                    res.status(501).send("Something Wrong with your FindAll Table"+err);
                } else {
                    res.send(result);
                    db.close();
                }
            });
        }

    });
};

let findByID = function (req,res) {
  MongoClient.connect(url, function (err,db) {
      if(err){
          res.status(503).send("Something Wrong With Your Connection Database");
      } else{
          db.collection("books").findOne({_id : ObjectID(req.params._id)}, function(err, result) {
              if(err){
                  res.status(501).send("Something Wrong with your FindId"+err);
              } else {
                  res.send(result);
                  db.close();
              }
          });
      }
  });
};

module.exports = {
    CreateDatabase,
    CreateTable,
    InsertData,
    UpdateData,
    findAllData,
    findByID
};