const express = require('express')
var router = express.Router()
const c_book = require('../controllers/books')
router.get('/', function(req, res ) {
  res.status(200).send('alive')
})

router.post('/api/books', c_book.add)
router.get('/api/books', c_book.getAll)
router.get('/api/books/:_id', c_book.getById)
router.delete('/api/books/:_id', c_book.remove)
router.put('/api/books/:_id', c_book.edit)


module.exports = router
