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

router.post('/:user/:month', (req, res) => {
    const userName = req.params.user;
    const month = req.params.month;
    const expense = new Expense({
        user_name: userName,
        month: month,
        date: new Date(),
        description: req.body.description,
        value: req.body.value
     })

     expense.save((err, val) => {
         if (!err) {
             res.send({
                 success: "true"
             })
         } else {
             res.send(err);
         }
     })
})

router.delete('/:user/:month/:id', (req, res) => {
    const id = req.params.id;

    Expense.deleteOne({ _id: id }, (err) => {
        if (!err) {
            res.send({
                success: "true"
            })
        } else {
            res.send(err);
        }
    })
})

router.patch('/:user/:month', (req, res) => {
    Expense.updateOne({ _id: req.body.id }, {description: req.body.description, value: req.body.value}, (err, val) => {
        if (!err) {
            res.send({
                success: "true"
            })
        } else {
            res.send(err);
        }
    })
})

module.exports = router;
