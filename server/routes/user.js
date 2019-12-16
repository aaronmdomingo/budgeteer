const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Month = require('../models/month.model');
const Expense = require('../models/expense.model');

router.get('/:user', (req, res) => {
    const user = req.params.user

    User.findOne({ user_name: user }, (err, foundUser) => {
        if (err) throw err;
        if (foundUser) {
            Expense.find({ user_name: user  }, (err, foundExpenses) => {
                if (err) throw err;
                if (foundExpenses) {
                    Month.find({ user_name: user }, (err, foundMonths) => {
                        if (err) throw err;
                        if (foundMonths) {
                            res.send({
                                user_name: foundUser.user_name,
                                first_name: foundUser.first_name,
                                last_name: foundUser.last_name,
                                totalExpenses: foundExpenses,
                                totalMonths: foundMonths
                            })
                        }
                    })
                } 
            })
        } else {
            res.send({
                error: 'Username does not exist'
            })
        }
    })
})

router.post('/login', (req, res,) => {
    const user = req.body.username;
    const password = req.body.password;

    User.findOne({ user_name: user }, (err, foundUser) => {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                if (!err && isMatch) {
                    res.send({ success: true });
                } else {
                    res.send({ error: 'Incorrect username or password' });
                }
            })
        } else {
            res.send({ error: 'Incorrect username or password' });
        }
    })
})
    


router.post('/:user', (req, res) => {
    const user = req.params.user;
    const budget = req.body.budget;
    User.findOne({ user_name: user || user.toLowerCase() }, (err, foundUser) => {
        if (foundUser) {
            res.send({
                error: "Username already exists"
             })
        } else {
            const newUser = new User({
                user_name: user,
                password: req.body.password,
                first_name: req.body.firstName,
                last_name: req.body.lastName
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (!err) {
                        newUser.password = hash;
                        newUser.save((err) => {
                            if (!err) {
                                const monthArr = ['January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'];

                                monthArr.forEach(monthName => {
                                    const month = new Month({
                                        user_name: user,
                                        month: monthName,
                                        current_budget: budget
                                    })
                                    month.save();
                                })
                                res.send({
                                    success: true
                                })
                            } else {
                                res.send(err);
                            }
                        })
                    } else {
                        res.send(err);
                    }
                })
            })
        }
    })
})

module.exports = router;