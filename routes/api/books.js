var express = require('express');
var router = express.Router();
var bookController = require('../../controllers/bookController');

router.get('/', bookController.getAll);
router.get('/:id', bookController.getSingle);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);
router.put('/:id', bookController.updateBook);

module.exports = router;
