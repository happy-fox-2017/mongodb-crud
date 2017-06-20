const express = require('express');
var router = express.Router();
var Books = require('../controller/books_controller');


router.get('/', Books.findAllBooks);
router.get('/:id', Books.findOneBook);
router.post('/', Books.insertManyBook);
router.delete('/:id', Books.DeleteBook);
router.patch('/:id', Books.updateBook)

// router.get('/', function(req,res,next) {
//   res.send('inininin')
// })

module.exports = router;
