var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

const local = new LocalStrategy(
    function(username, password, done) {
    // When a user tries to sign in this code runs
        User.findOne({
                username: username
            }
        ).then(function(dbUser) {
            console.log(dbUser);
            // If there's no user with the given username or incoorect password
            if (!dbUser || !dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect username/password"
                });
            }

            // If none of the above, return the user
            console.log("returning user");
            return done(null, dbUser);
        }).catch((err) => console.log(err));
    }
)

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use("local", local);

// In order to help keep authentication state across HTTP requests,
// Mongoose needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
    console.log("serialize")

    done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
    console.log("deserialize")
    User.findById(userId, (err, user) => done(err,user));

});

// Exporting our configured passport
module.exports = passport;
