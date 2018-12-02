const express = require('express');
const router = express.Router();
var path = require('path');

const metadata = require(path.join(__dirname, '../../db/_metadata'))


// GET metadata
router.get('/', function(req, res, next) {
    res.json(metadata);
});

// GET metadata/:id
// router.get('/:id', function(req, res, next) {
//     res.json(data);
// });

module.exports = router;