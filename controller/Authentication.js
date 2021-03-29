var passport = require('passport');
var USER = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5')

passport.use(
    'local',
    new LocalStrategy({ usernameField: 'Email', passwordField: 'Password' },
        async (username, password, done) => {
            try {
                console.log(username, password);
                let user = await USER.find({ Email: username, password: md5(password) });
                if (user.length === 1) {
                    return done(null, user[0]);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    USER.findById(id, function (err, user) {
        done(err, user);
    });
});
module.exports = {
    isLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        throw res.redirect('/');
    },
};