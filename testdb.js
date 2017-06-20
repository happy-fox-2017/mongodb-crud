var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/library'

var connect = () => {
  MongoClient.connect(url, (err,db) => {
    if (err) {console.log(err);}
    else {console.log("connect success");}
    db.close()
  })
}

var insertDoc = (db, callback) => {
  var collection = db.collection.books
  collection.insertOne({
    "isbn" : "978-1-60309-055",
    "title" : "Pujangga mencari nafkah",
    "author" : "Aku",
    "catergory" : "Fiksi dunia",
    "stock" : 5
  })
}

var cobaInsert = () => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    db.collection('books').insertOne({
      "isbn" : "978-1-60309-666",
      "title" : "Nafkah kamu nafkah aku juga",
      "author" : "Penyair",
      "catergory" : "Fiksi Kamu",
      "stock" : 5
    }, (err, row) => {
      if (err) {console.log(err);}
      else {console.log(row);}
    })
    db.close()
  })
}

var getAll = () => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    db.collection('books').find({}, (err, books) => {
      books.forEach(book => {
        console.log(book);
      })
    })
    db.close()
  })
}

var getOne = () => {
  MongoClient.connect(url, (err,db) => {
    console.log('connect to server');
    let id = ObjectID("5948a932297ced1d75849469")
    let query = {
        title : {
        $regex : /puj/i
      }
    }
    db.collection('books').findOne(query, (err, book) => {
      if (err) throw err
      console.log(book);
    })
    db.close()
  })
}

var update = () => {
  MongoClient.connect(url, (err,db) => {
    if (err) {
      console.log(err);
    }
    console.log('connect to server success');
    // id = ObjectId(`$`)
    let query = {isbn : '978-1-60309-055'}
    let newValues = {title : 'Pujangga mencari cinta kamu', author : 'Aku dan kamu'}
    db.collection('books').update(query, newValues, (err,book) => {
      if (err) throw err
      console.log(book.result.nModified + "record updated");
      db.close()
    })
  })
}

var remove = () => {
  MongoClient.connect(url, (err,db) => {
    let id = ObjectID('5948b9f7166fcd37ccafa2ed')
    let query = {_id : id}
    if (err) throw err
    console.log(`Connected to server`);
    db.collection('books').remove(query, (err, book) => {
      if (err) throw err
      console.log(book.result.n + "deleted");
      db.close()
    })
  })
}

// getAll()
getOne()
