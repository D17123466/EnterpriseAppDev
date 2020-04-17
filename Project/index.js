var express = require('express');
var mongoose = require('mongoose');
var flash = require('connect-flash'); // Flash is an extension of connect-flash with the ability to define a flash message and render it without redirecting the request.
var bodyParser = require('body-parser'); // Node.js body parsing middleware.
var session = require('express-session'); // Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
var methodOverride = require('method-override');
var app = express();

// Mongoose Configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var DB = mongoose.connection;
DB.once('open', function() {
    console.log('Mongoose - Connected');
});
DB.on('error', function(err) {
    console.log('Mongoose - Error : ', err);
});

// Middleware Configuration
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({secret: 'D17123466', resave: true, saveUninitialized: true}));
app.use(flash());
// Router Configuration
app.use('/', require('./routes/home'));
app.use('/dashboard', require('./routes/dashboard'));



// Port Configuration
app.listen(8080, function(){
  console.log('http://localhost:8080');
});