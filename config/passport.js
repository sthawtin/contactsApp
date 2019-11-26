const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function () {
    passport.use(new Strategy(
        function (username, password, cb) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return cb(null, user);
                    } else {
                        return cb(null, false);
                    };
                });
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
};