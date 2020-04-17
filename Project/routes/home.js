var express = require('express');
var router = express.Router();

// Home page
router.get('/', function(req, res) {
    res.render('home/index');
});

// // Record page
// router.get('/record', function(req, res) {
//     res.render('home/record');
// })

// // Board page
// router.get('/board', function(req, res) {
//     res.render('home/board');
// });

module.exports = router;