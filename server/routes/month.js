const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Api is working properly');
})

module.exports = router;