var express = require('express');
var router = express.Router();
var Table = require('../models/Table')
var moment = require('moment-timezone');
// Create
// Read
// Update
// Delete 

// Index
router.get('/', async function(req, res) {
    await Table.find({}).sort('row_id').exec(function(err, rows) {
        if (err) return res.json(err);
        res.render('dashboard/index', {rows: rows});
    });
});

// Create
router.get('/add', function(req, res) {
    res.render('dashboard/add');
});
router.post('/', async function(req, res) {
    console.log("Mongoose - Inserted");
    // req.body.date = moment(req.body.date).tz('Europe/Dublin').format('ha z');
    await Table.create(req.body, function(err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});

// Update
router.get('/:id', function(req, res) {
    Table.findOne({_id: req.params.id}, function(err, row) {    
        if (err) return res.json(err);
        res.render('dashboard/modify', {row: row});
    });
});
router.put('/:id', async function(req, res) {
    console.log("Mongoose - Updated")
    await Table.findOneAndUpdate({_id: req.params.id}, req.body, function(err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});

// Delete
router.delete('/:id', async function(req, res) {
    console.log("Mongosse - Deleted");
    await Table.deleteOne({_id: req.params.id}, function(err, row) {
        if (err) return res.json(err);
        res.redirect('/dashboard');
    });
});


module.exports = router;