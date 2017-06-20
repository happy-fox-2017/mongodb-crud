var express = require('express');
var router = express.Router();
const bookCont = require('../controllers/bookController');

/* GET home page. */
router.get('/books', bookCont.getAllBooks);
router.get('/books/:id', bookCont.getOneBook);
router.post('/books', bookCont.createBook);
router.delete('/books/:id', bookCont.deleteBook);
router.put('/books/:id', bookCont.updateBook);

module.exports = router;
