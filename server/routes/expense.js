const express = require('express');
const router = express.Router();
const Expense = require('../models/expense.model');

router.get('/', (req, res) => {
    res.send('Api is working properly');
})

module.exports = router;