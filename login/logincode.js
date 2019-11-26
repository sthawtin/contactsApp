const passport = require('passport');
const Strategy = require('passport-local').Strategy;
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

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize())
app.use(passport.session())
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './register.html'));
});

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
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'FAIL' }),
    (req, res) => {
        res.redirect('/test')
    });
    
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back')
})

app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) throw err
        res.json(result)
    })
});

app.get('/test', (req, res) => {
    res.render('home', { user: req.user })
});
