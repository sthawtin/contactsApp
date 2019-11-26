// Import Node modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const path = require('path');

// Import Mongoose database model
let User = require('../models/User');

// Routes
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/register.html'));

});

// Register user. Encrypts password before saving to database.
router.post('/register', (req, res) => {
    let newUser = new User({ username: req.body.username, password: req.body.password });

    bcrypt.genSalt(10, (err, salt) => {
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
                        return res.redirect('/userLogin/dashboard')
                    });
                };
            });
        });
    });
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/login.html'));

});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/dashboard' }),
    (req, res) => {
        res.redirect('/userLogin/dashboard')
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back')
})


// Get list of usernames and hashed passwords as JSON
// router.get('/users', (req, res) => {
//     User.find({}, (err, result) => {
//         if (err) throw err
//         res.json(result)
//     })
// });

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user })
});

module.exports = router;