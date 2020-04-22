var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

// Create
// Read
// Update
// Delete 

// Create
router.get('/signup', function (req, res) {
    var account = '';
    var errors = '';
    res.render('account/signup', {account: account, errors: errors});
});
router.post('/', function (req, res) {
    console.log("Mongoose - Account - Insert");
    Account.create(req.body, function (err, account) {
        if (err) {
            var errors = err;
            var account = req.body;
            return res.render('account/signup', {account: account, errors: errors});
        }
        res.redirect('/signin');
    });
});

// Update
router.get('/:username', function (req, res) {
    Account.findOne({username: req.params.username}, function (err, account) {
        if (err) return res.json(err);
        res.render('account/profile', {account: account});
    })
});
router.get('/:username/update', function (req, res) {
    var errors = '';
    Account.findOne({username: req.params.username}, function (err, account) {
        if (err) return res.json(err);
        res.render('account/update', {account: account, errors: errors});
    });
});
router.put('/:username', function (req, res) {
    console.log("Mongoose - Account - Update")
    Account.findOne({username: req.params.username}).select('password').exec(function (err, account) {
        if (err) return res.json(err);

        console.log(req)
        account.password_old = account.password;
        account.password = req.body.password_new ? req.body.password_new : account.password;

        for (var pwd in req.body) {
            account[pwd] = req.body[pwd];
        }

        account.save(function (err, account) {
            if (err) {
                var account = req.body;
                var errors = err;
                // console.log(account);
                // console.log(errors);
                // return res.json(err);
                return res.render('account/update', {account: account, errors: errors});
            }
            
            res.redirect('/account/' + account.username);
        });
    });
});

// Delete
router.delete('/:username', function (req, res) {
    console.log("Mongoose - Account - Delete")
    Account.deleteOne({username: req.params.username}, function (err) {
        if (err) return res.json(err);
        res.redirect('/');
    });
});

module.exports = router;
