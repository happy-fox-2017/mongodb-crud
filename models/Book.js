const COLLECTION_NAME = 'books';

class Book {

  constructor(options) {
    this.isbn = options.isbn;
    this.title = options.title;
    this.author = options.author;
    this.category = options.category;
    this.stock = options.stock;
  }

  static findAll(db, callback) {
    db.collection(COLLECTION_NAME).find({}).toArray((errFind, result) => {
      if (errFind) throw errFind;
      callback(result);
    });
  }

  save(db, callback) {
    db.collection(COLLECTION_NAME).insertOne(this, (insertErr, result) => {
      if (insertErr) throw insertErr;
      callback(result);
    });
  }
}

module.exports = Book;
