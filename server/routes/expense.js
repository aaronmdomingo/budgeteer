const express = require('express');
const router = express.Router();
const Expense = require('../models/expense.model');

router.get('/:user/:month', (req, res) => {
    const userName = req.params.user;
    const month = req.params.month;
    Expense.find({ user_name: `${userName}`, month: `${month}` }, (err, foundExpenses) => {
        if (!err) {
            res.json(foundExpenses);
        } else {
            res.json(err);
        }
    })
})

router.post('/:user/:month', (req, res) => {
    const userName = req.params.user;
    const month = req.params.month;
    const expense = new Expense({
        user_name: userName,
        month: month,
        date: new Date().setHours(0, 0, 0, 0),
        description: req.body.description,
        value: req.body.value
     })

     expense.save((err, val) => {
         if (!err) {
             res.json({
                 success: "true"
             })
         } else {
             res.json(err);
         }
     })
})

router.delete('/:user/:month/:id', (req, res) => {
    const id = req.params.id;

    Expense.deleteOne({ _id: id }, (err) => {
        if (!err) {
            res.json({
                success: "true"
            })
        } else {
            res.json(err);
        }
    })
})

router.patch('/:user/:month', (req, res) => {
    Expense.updateOne({ _id: req.body.id }, {description: req.body.description, value: req.body.value}, (err, val) => {
        if (!err) {
            res.json({
                success: "true"
            })
        } else {
            res.json(err);
        }
    })
})

module.exports = router;
