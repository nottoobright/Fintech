var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('send', { title: 'Send Documents' });
});

module.exports = router;