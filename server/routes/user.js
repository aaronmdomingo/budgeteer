const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

router.post('/:user', (req, res) => {
    const user = req.params.user.toLowerCase();
    User.findOne({ user_name: user }, (err, foundUser) => {
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
                                res.send({
                                    message: "user created"
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