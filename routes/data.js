var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('data', { title: 'Send Data' });
});

module.exports = router;