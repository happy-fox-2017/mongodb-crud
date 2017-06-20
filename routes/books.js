var router = require('express').Router()
var booksController = require('../controllers/booksController')

router.post('/', booksController.createBook)
router.get('/', booksController.getAll)
router.patch('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)
module.exports = router;
