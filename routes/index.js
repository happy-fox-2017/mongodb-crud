var express = require('express');
var router = express.Router();
var conn = require('../controller/bookControllers.js')

router.get('/books', conn.findAllBook)

router.post('/books', conn.createBook)

router.put('/books/:id', conn.updateBook)

router.delete('books/:id', conn.deleteBook)





module.exports = router;