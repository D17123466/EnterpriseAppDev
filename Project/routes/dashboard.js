var express = require('express');
var router = express.Router();
var Table = require('../models/Table');
var Account = require('../models/Account');
var moment = require('moment-timezone');

// CRUD
// Table / Chart

// Read
router.get('/', async function (req, res) {
    console.log("Mongoose - Table - Read");
    await Table.find({}).populate('user').sort('row_id').exec(function (err, rows) {
        if (err) return res.json(err);
        res.render('dashboard/index', {rows: rows});
    });
});

// Create
router.get('/create', function (req, res) {
    res.render('dashboard/create');
});
router.post('/', async function (req, res) {
    console.log("Mongoose - Table - Insert");
    req.body.user = req.user._id;
    await Table.create(req.body, function (err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});

// Update
router.get('/:id', function (req, res) {
    Table.findOne({_id: req.params.id}).populate('user').exec(function (err, row) {    
        if (err) return res.json(err);
        res.render('dashboard/update', {row: row});
    });
});
router.put('/:id', async function (req, res) {
    console.log("Mongoose - Table - Update")
    await Table.findOneAndUpdate({_id: req.params.id}, req.body, function (err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});

// Delete
router.delete('/:id', async function (req, res) {
    console.log("Mongosse - Table - Delete");
    await Table.deleteOne({_id: req.params.id}, function (err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});

module.exports = router;