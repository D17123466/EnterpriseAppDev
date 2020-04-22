var express = require('express');
var mongoose = require('mongoose');
var flash = require('connect-flash'); // Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.
var bodyParser = require('body-parser'); // Node.js body parsing middleware.
var session = require('express-session'); // Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
var methodOverride = require('method-override');
var passport = require('./config/passport');
var app = express();

// Mongoose Configuration 
// Reference: https://mongoosejs.com/docs/index.html
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://Jeong:gokos7lovepp@cluster0-8bsrh.mongodb.net/EAD?retryWrites=true&w=majority");
var DB = mongoose.connection;
DB.once('open', function () {
    console.log('Mongoose - Connected');
});
DB.on('error', function (err) {
    console.log('Mongoose - Error : ', err);
});

// Middleware Configuration
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(express.static('node_modules/'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

// Session Authentication
app.use(session({secret: 'D17123466', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.account_current = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  if (res.locals.isAuthenticated) {
    console.log("Session Authentication - On");
  }
  else {
    console.log("Session Authentication - Off");
  }
  next();  
});

// Router Configuration
app.use('/', require('./routes/home'));                 
app.use('/dashboard', require('./routes/dashboard'));   
app.use('/account', require('./routes/account'));      

// Port Configuration
app.listen(8080, function (){
  console.log('http://localhost:8080');
});