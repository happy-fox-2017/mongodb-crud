const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');

router.post('/', (req, res) => {
  bookController.create(req, res);
});

router.get('/', (req, res) => {
  bookController.findAll(req, res);
});

module.exports = router;
