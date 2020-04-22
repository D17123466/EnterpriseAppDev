var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');

passport.serializeUser(function (account, done) {
    console.log('SerializeUser');
    done(null, account.id);
});
passport.deserializeUser(function (id, done) {
    console.log('deserializeUser');
    Account.findOne({_id: id}, function (err, account) {
        if (err) return done(err);  
        done(null, account);
    });
});

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true}, function (req, username, password, done) {
    Account.findOne({username: username}).select({username: 1, password: 1}).exec(function (err, account) {
        if (err) return done(err);
        if (!account) {
            req.flash('errors', {username: 'Your username is incorrect'})
            return done(null, false);
        }   
        if (!account.authenticate(password)) {
            req.flash('errors', {password: 'Your passoword is incorrect'})
            return done(null, false);
        }
        return done(null, account);
    });
}));

module.exports = passport;
