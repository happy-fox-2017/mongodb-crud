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
    res.send({ result: 'OK', book });
  });
};
