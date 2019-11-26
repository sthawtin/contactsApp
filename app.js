// Import Node modules
const express = require('express'); // Import Express module
const path = require('path'); // Utility to work with file and directory path (used in Express 'static' middleware)
const mongoose = require('mongoose'); // MongoDB ODM
const bodyParser = require('body-parser'); // Middleware to parse body requests
const seedDatabase = require('./controllers/seedMongoose'); // Custom module to seed database with data

//$$$$$$$$$
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


// Import controllers
const htmlController = require('./controllers/htmlController')
const apiController = require('./controllers/apiController')

// Import Mongoose database model for Contacts
const Contact = require('./models/Contact.js');

// Create Express server
const app = express();

// Set port to 8080 if not found in process.env file
const PORT = process.env.PORT || 8080;

// Enter the details of your MongoDB instance
const MONGO = 'localhost:27017'

// Point Mongoose to the url of running MongoDB server and database
mongoose.connect('mongodb://' + MONGO + '/cadb', { useNewUrlParser: true });

// Set path to directory containing static files. 
app.use(express.static(path.join(__dirname, 'public')));

// Parse application/x-www-form-urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json request body
app.use(bodyParser.json());

// Import controllers to serve static html file and the API
app.use('/', htmlController);
app.use('/api', apiController);

// Check to see if the database is empty. If it is empty seed with data.
Contact.find({}, (err, results) => {
    if (err) throw err;
    if (!results.length) {
        seedDatabase();
        console.log('Database empty. Seeding...')
    } else {
        console.log('Database not empty. Did not seed.')
    }
});

//$$$$$$$$$
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

passport.use(new Strategy(
    function (username, password, cb) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
//$$$$$$$$$
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize())
app.use(passport.session())
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './register.html'));
})

app.post('/register', (req, res) => {
    let newUser = new User({ username: req.body.username, password: req.body.password });
    newUser.save(function (err) {
        if (err) throw err;
        else {
            req.login(newUser, function (err) {
                if (err) throw err;
                return res.redirect('/test')
            })
        }
    })
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'));
})
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'FAIL' }),
    (req, res) => {
        res.redirect('/test')
    }
)
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back')
})

app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})
app.get('/test', (req, res) => {
    res.render('home', { user: req.user })
})
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Listen for connections
app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
});