const express = require('express');
const router = express.Router();
const books = require('../controllers/book');

//get all data
router.get('/', books.show);
//get one data of book
router.get('/:id', books.showOne);
//create data to book
router.post('/', books.create);
//update one data from book
router.put('/:id', books.update);
//delete one of record of book
router.delete('/:id', books.delete);

module.exports = router;
