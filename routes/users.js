var express = require('express');
var router = express.Router();
var controller = require('../controllers/books_controller');

/* GET users listing. */
router.get('/', controller.getAllBooks);
router.post('/', controller.createBook);

module.exports = router;
