const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');

router.post('/', bookController.create);

router.get('/', bookController.findAll);

router.put('/:isbn', bookController.update);

router.delete('/:isbn', bookController.delete);

module.exports = router;
