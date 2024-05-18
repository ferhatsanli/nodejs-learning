const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('routing to test');
    res.sendFile(path.join(__dirname, '..', 'views', 'test.html'));
});

module.exports = router;