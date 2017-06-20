var express = require('express');
var router = express.Router();
var Student = require('../controller/cStudents');

/* GET home page. */
router.post('/api/createDatabase', Student.CreateDatabase);
router.post('/api/books/createTable', Student.CreateTable);
router.post('/api/books/insertData', Student.InsertData);
router.post('/api/books/:_id', Student.UpdateData);
router.get('/api/books/', Student.findAllData);
router.get('/api/books/:_id', Student.findByID);

module.exports = router;
