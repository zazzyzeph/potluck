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

// load models
var User = require('./models/guest');
var Item = require('./models/guest');

// api router (for posts / delete)
var guestsRouter = express.Router();
guestsRouter.use(function(req, res, next){
    // log a dumb message on request
    console.log('an api request?? for me??');
    next();
});


//set routes
app.get('/', function(req, res){
	res.render('index');
});
guestsRouter.get('/', function(req,res){
     User.find(function(err, users){
        if (err) res.send(err);
        console.log(users);
        res.json(users);
    });
});
guestsRouter.get('/:user_id', function(req,res){
    // get the user with that id
    // GET at the uri above ;)
    User.findById(req.params.user_id, function(err, user){
    if (err) res.send(err);

    //return that user!
    res.render('potluckform');
    });
});
guestsRouter.get('/:user_id/items', function(req,res){
    // get the user with that id
    // GET at the uri above ;)
    User.findById(req.params.user_id, function(err, user){
    if (err) res.send(err);

    //return that user!
    res.json(user.items);
    });
});
guestsRouter.post('/:user_id', function(req,res){
    User.findById(req.params.user_id, function(err, user){
        var item = new Item();
        item.name = req.body.name;
        item.type = req.body.type;
        item.servings = req.body.servings;
        item.allergies = req.body.allergies;
        item.notes = req.body.notes;
        user.items.push({
            name:item.name,
            type:item.type,
            servings:item.servings,
            allergies:item.allergies,
            notes:item.notes
        });
        user.save(function(err){

            if (err){
                // if duplicate
                if (err.code == 11000)
                    return res.json({success:false, message: 'Sorry, you can\'t have duplicate item names.'});
                else
                    return res.send(err);
            }
        });
    });
    
});
guestsRouter.post('/', function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    // save the user and check for errors
    user.save(function(err){
        if (err){
            // if duplicate
            if (err.code == 11000)
                return res.json({success:false, message: 'A user with that email already exists. '});
            else
                return res.send(err);
        }
        else{
            res.render('usercreated');
            // NODEMAILER
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
            transporter.sendMail({
                to: user.email,
                subject: 'hello ' + user.name,
                text: 'hi! here\'s your link for adding / modifying your potluck items: http://localhost:1337/guests/' + user._id
            });
        }
    });
});






// START THE SERVER
// =================================
app.use('/guests', guestsRouter);
app.listen(port);
console.log('localhost:' + port + ' for the homepage, /guests for the api!');


//  FLOW
// potluck.biz => input email address and name via x-encoded form
// 