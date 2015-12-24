// the db is local so do mongod --dbpath data/db in a terminal

// BASE SETUP
// =======================

// CALL THE PACKAGES
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var port = process.env.PORT || 1337;



// APP CONFIG
// =======================

app.locals.pretty = true;
// make views the directory for templates
app.set('views', path.join(__dirname, 'views'));
app.set('stylesheets', path.join(__dirname, 'public/stylesheets'));

// use body-parser to grab info from post requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// use jade
app.set('view engine', 'jade');
// set root get dir to public
app.use(express.static('public'));

// configure our app to handle CORS (cross origin) requests
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
	next();
});

// log all reqs to console
app.use(morgan('dev'));

// connect to local db
mongoose.connect('mongodb://localhost:27017/userDB');


//set routes
app.get('/', function(req, res){
	res.render('index');
});

// load models
var Guest = require('./models/guest');


// START THE SERVER
// =================================
app.listen(port);
console.log('localhost:' + port + ' for the homepage, /api for the api!');

// NODEMAILER
// ========================
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thewhistlego@gmail.com',
        pass: 'w00pw00p!'
    }
}, {
    // default values for sendMail method
    from: 'thewhistlego@gmail.com',
    headers: {
        // 'My-Awesome-Header': '123'
    }
});
// transporter.sendMail({
//     to: 'zephyr.prusinski@gmail.com',
//     subject: 'hello',
//     text: 'hello world!'
// });


//  FLOW
// potluck.biz => input email address and name via x-encoded form
// 