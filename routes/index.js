var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("sedat");
  res.json({data:"sedat"});
  res.end();
});

module.exports = router;
