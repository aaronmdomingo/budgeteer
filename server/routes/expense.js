const express = require('express');
const router = express.Router();
const Expense = require('../models/expense.model');

router.get('/:user/:month', (req, res) => {
    const userName = req.params.user;
    const month = req.params.month;
    Expense.find({ user_name: `${userName}`, month: `${month}` }, (err, foundExpenses) => {
        if (!err) {
            res.send(foundExpenses);
        } else {
            res.send(err);
        }
    })
})

module.exports = router;