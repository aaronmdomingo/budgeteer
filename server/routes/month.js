const express = require('express');
const router = express.Router();
const Month = require('../models/month.model');

router.get('/:user/:month', (req, res) => {
    const user = req.params.user;
    const month = req.params.month;
    Month.findOne({ user_name: `${user}`, month: `${month}` }, (err, foundMonth) => {
        if (!err) {
            res.send(foundMonth);
        } else {
            res.send(err);
        }
    })
})

module.exports = router;