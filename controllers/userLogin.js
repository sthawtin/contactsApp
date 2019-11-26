
const expres = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

let User = require('../models/User');

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './register.html'));
});

router.post('/register', (req, res) => {
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

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'));
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'FAIL' }),
    (req, res) => {
        res.redirect('/test')
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
    res.render('home', { user: req.user })
});

module.exports = router;