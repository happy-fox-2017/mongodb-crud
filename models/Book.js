const COLLECTION_NAME = 'books';

class Book {

  constructor(options) {
    if (Object.prototype.hasOwnProperty.call(options, '_id')) {
      this._id = options._id;
    } else {
      this._id = null;
    }

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
    const id = this._id;
    delete this._id;

    if (id) {
      db.collection(COLLECTION_NAME).update({ _id: id }, this, (updateErr, result) => {
        if (updateErr) throw updateErr;
        callback(result);
      });
    } else {
      db.collection(COLLECTION_NAME).insertOne(this, (insertErr, result) => {
        if (insertErr) throw insertErr;
        callback(result);
      });
    }
  }

  static findByIsbn(db, isbn, callback) {
    db.collection(COLLECTION_NAME).findOne({ isbn }, (errFind, result) => {
      if (errFind) throw errFind;
      const book = new Book(result);
      callback(book);
    });
  }

  static remove(db, isbn, callback) {
    db.collection(COLLECTION_NAME).deleteOne({ isbn }, (errRemove, result) => {
      if (errRemove) throw errRemove;
      callback();
    });
  }
}

module.exports = Book;
