const expres = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

let User = require('../models/User');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/register.html'));

});

router.post('/register', (req, res) => {
    let newUser = new User({ username: req.body.username, password: req.body.password });

    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
            console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
            if (err) throw err;
            else {
                req.login(newUser, function (err) {
                    if (err) throw err;
                    return res.redirect('back')
                });
            };
        });
    });


});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/login.html'));

});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/login')
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back')
})

router.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) throw err
        res.json(result)
    })
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/login.html'));

    res.render('home', { user: req.user })
});

module.exports = router;