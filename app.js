// Import Node modules
const express = require('express'); // Import Express module
const path = require('path'); // Utility to work with file and directory path (used in Express 'static' middleware)
const mongoose = require('mongoose'); // MongoDB ODM
const bodyParser = require('body-parser'); // Middleware to parse body requests
const seedDatabase = require('./controllers/seedMongoose'); // Custom module to seed database with data
const session = require('express-session');
const passport = require('passport');

// Import controllers
const htmlController = require('./controllers/htmlController')
const apiController = require('./controllers/apiController')
const userLogin = require('./controllers/userLogin');

// Import Mongoose database model
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

// Set Express session middleware settings
app.use(session({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false
}));

// Bring in Passport config
require('./config/passport')(passport);

// Use Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Views Engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import controllers to serve static html file and the API
app.use('/', htmlController);
app.use('/api', apiController);
app.use('/userLogin', userLogin);

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

// Listen for connections
app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
});