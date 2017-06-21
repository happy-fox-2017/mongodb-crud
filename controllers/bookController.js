var mongoClient = require('mongodb').MongoClient();
var url = 'mongodb://localhost:27017/library'
var ObjectId = require('mongodb').ObjectId;



function getAll(req, res) {
  mongoClient.connect(url, function(err,db) {
    if (err) {
      res.send(err.message);
    }
    db.collection('Books').find({}).toArray(function(err, result) {
      if (err) {
        res.send(err.message);
      }

      console.log(result);
      res.send(result);
      //db.close();
    });
  });
}

function getSingle(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }

    db.collection('Books').find({
      _id: ObjectId(req.params.id)
    }).toArray(function(err, result) {
      if (err) {
        res.send(err.message);
      }
      res.send(result);
      //db.close();
    });
  });
}


function createBook(req,res) {
  mongoClient.connect(url, (err,db) => {
    if(err) {
      res.send(err.message);
    }
    db.collection('Books').insert(
    {
      isbn : req.body.isbn,
      title : req.body.title,
      author : req.body.author,
      category : req.body.category,
      stock : req.body.stock
    }, (err,data)=> {
      if(err){
        res.send(err.message)
      }
      console.log(data);
      res.send(data);
    })
  })
}

function updateBook(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }
    db.collection('Books').find({
      _id: ObjectId(req.params.id)
    }).toArray(function(err, result) {
      db.collection('Books').update({
      }, {
        $set: {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: req.body.stock
        }
      }, (err, result) => {
        if (err) return res.send(err)
          res.send(result);
          db.close();
      });
    });
  });
}
function deleteBook(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) {
      res.send(err.message);
    }
    db.collection('Books').deleteOne({
      _id: ObjectId(req.params.id)
    }, function(err, result) {
      if (err) {
        res.send(err.message);
      }
      console.log("Delete Books success!!");
      res.send("Delete Books success!!\n" + result);
      //db.close();
    });
  });
}

module.exports = {getAll,getSingle,createBook,deleteBook,updateBook};
