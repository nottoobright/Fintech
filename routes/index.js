var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dashboard' });
});

router.get('/profile', (req, res) => {
    res.render('profile');
});


module.exports = router;

