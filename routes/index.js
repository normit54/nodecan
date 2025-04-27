var express = require('express');
var router = express.Router();

//environments config klasorunu tanımladık - views index.js de basacağız
const config = require("../config");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GURKAN Express', config: config });
});

module.exports = router;
