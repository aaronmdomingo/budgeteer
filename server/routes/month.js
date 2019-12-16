const express = require('express');
const router = express.Router();
const Month = require('../models/month.model');

router.use(express.json());

router.get('/:user/:month', (req, res) => {
    const user = req.params.user;
    const month = req.params.month;
    Month.findOne({ user_name: `${user}`, month: `${month}` }, (err, foundMonth) => {
        if (!err) {
            res.json(foundMonth);
        } else {
            res.json(err);
        }
    })
})

router.patch('/:user/:month', (req, res) => {
    Month.updateOne({ _id: req.body.id }, {current_budget: req.body.budget}, (err, val) => {
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