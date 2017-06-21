const Book = require('../models/Book');

exports.findAll = (req, res) => {
  const db = req.app.locals.db;
  Book.findAll(db, (books) => {
    res.send(books);
  });
};

exports.create = (req, res) => {
  const db = req.app.locals.db;
  const book = new Book(req.body);
  book.save(db, () => {
    res.send({ result: 'CREATE_OK', book });
  });
};

exports.update = (req, res) => {
  const db = req.app.locals.db;
  const isbn = req.params.isbn;
  const bookFromRequest = req.body;
  const book = Book.findByIsbn(db, isbn, (foundBook) => {
    foundBook.title = bookFromRequest.title;
    foundBook.author = bookFromRequest.author;
    foundBook.category = bookFromRequest.category;
    foundBook.stock = bookFromRequest.stock;
    foundBook.save(db, () => {
      res.send({ result: 'UPDATE_OK', book });
    });
  });
};
