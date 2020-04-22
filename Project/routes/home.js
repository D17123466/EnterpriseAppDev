var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

// CRUD
// Sign In / Sign Up

router.get('/', function (req, res) {
    res.render('home/index');
});

router.get('/signin', function (req, res) {
    var errors = req.flash('errors')[0] || {};
    res.render('home/signin', {errors: errors});
});

router.post('/signin', function (req, res, next) {
    if (!req.body.username && !req.body.password) {
        res.redirect('/signin');
    }
    next();
}, 
passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        // failureFlash: true
    })
);

router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;