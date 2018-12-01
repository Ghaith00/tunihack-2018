var express = require('express');
var router = express.Router();

// GET documents.
router.get('/', function(req, res, next) {
  res.send({route: "document"});
});

module.exports = router;
