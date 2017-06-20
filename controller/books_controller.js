var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost/mongodb-crud';
var ObjectID = require('mongodb').ObjectId

var findAllBooks = (req,res,next)=>{
     MongoClient.connect(url, (err,db)=>{
          if(err) {
               res.send(err)
          } else {
               let bookstore = db.collection('collection_books')
               bookstore.find().toArray((err,documents)=>{
                    if(err) {
                         res.send(err)
                    } else {
                         res.send(documents)
                         db.close()
                    }
               })
          }
     })
}

var findOneBook = (req,res,next) =>{
     MongoClient.connect(url, (err, db)=>{
          if(err) {
               res.send(err)
          } else {
               let bookstore = db.collection('collection_books')
               bookstore.find({ id : req.params.id }).toArray((err, documents)=>{
                    if(err) {
                         res.send(err)
                    } else {
                         res.send(documents)
                         db.close();
                    }
               })
          }
     })
}

var insertManyBook = (req,res,next) =>{
     MongoClient.connect(url, (err, db)=>{
     if (err) {
          res.send(err)
     }    else {
          let bookstore = db.collection('collection_books')
          bookstore.insertMany([
               {
                    isbn : req.body.isbn,
                    title : req.body.title,
                    author : req.body.author,
                     category : req.body.category,
                     stok : req.body.stok
               }
          ], (err, documents)=>{
               res.send(documents)
               db.close();
          })

     }
     })
}

var DeleteBook = (req,res,next)=>{
     MongoClient.connect(url, (err, db)=>{
          if (err) {
               res.send(err)
          } else {
               let bookstore = db.collection('collection_books')
               bookstore.deleteOne({ id : req.params.id}, function(err, documents) {
                    res.send({
                         documents : documents,
                         msg : `Delete data Success id : ${req.params.id}`
                    })
                    db.close();
               })
          }
     })
}

var updateBook = (req,res,next)=>{
     MongoClient.connect(url, (err, db)=>{
          if (err) {
               res.send(err)
          } else {
               let bookstore = db.collection('collection_books')
               bookstore.updateOne({
                    _id : ObjectID(req.params.id)
               },
               {
                    $set :  {
                         isbn : req.body.isbn,
                         title : req.body.title,
                         author : req.body.author,
                          category : req.body.category,
                          stok : req.body.stok
                    }
               }, {new : true }, (err, documents)=>{
                    if (err) {
                         console.log('abis if update');
                         res.send(err)
                    } else {
                         res.send(documents)
                         db.close();
                    }
               })
          }
     })
}


module.exports = {
  findAllBooks,
  findOneBook,
  insertManyBook,
  DeleteBook,
  updateBook

}
