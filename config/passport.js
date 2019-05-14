const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const TwitterTokenStrategy = require("passport-twitter-token");
const User = require("../models/user");
const { connectTwitter } = require("../controllers/userController");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
    function(username, password, done) {
        // When a user tries to sign in this code runs
        User.findOne({
                username: username
            }
        ).then(function(dbUser) {
            // If there's no user with the given username or incoorect password
            if (!dbUser || !dbUser.comparePassword(password)) {
                return done(null, false, {
                    message: "Incorrect username/password"
                });
            }

            // If none of the above, return the user
            console.log("returning user");
            return done(null, dbUser);
        }).catch((err) => console.log(err));
    })
);

// Use the Twitter Token Strategy to call the Oauth Verifier
passport.use(new TwitterTokenStrategy({

    consumerKey: "PUKeIFz9XrfpLMaePxdSBCOpo",
    consumerSecret: "u6YVPzov7A2RKOd37PGIASbQAG09aHUrolU93YXhqL9aBZuyXJ",
    passReqToCallback: true
},
    function(req, token, tokenSecret, profile, done) {

        if (req.user) {
            User.findOne({
                username: req.user.username
            })
            .then(dbUser => {
                // If there's no user with the given
                if (!dbUser) {
                    console.log("Failed to find user in DB!");
                    return done(null, false, {
                        message: "User doesn't have an account"
                    });
                } else if (dbUser.twitter.id !== undefined) {
        
                    console.log("Twitter is already connected!")
                    // Twitter is already connected
                    return done(null, dbUser);
                } else {

                    // Update user model to include twitter info
                    dbUser.twitter.id = profile.id;
                    dbUser.twitter.token = token;
                    dbUser.twitter.tokenSecret = tokenSecret;
                    dbUser.twitter.displayName = profile.displayName;
                    dbUser.twitter.handle = profile.username;
                    dbUser.twitter.photo = profile.photos[0].value || '';

                    User.updateOne({ username: dbUser.username}, dbUser)
                        .then(newUser => {
                            const user = newUser;
                            done(null, user);
                        })
                        .catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
        } else {
            return done(null, false, {
                message: "User isn't Authenticated with this application!"
            })
        }
    }
))

// In order to help keep authentication state across HTTP requests,
// Mongoose needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {

    done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
    console.log("deserialize")
    User.findById(userId, "-password -twitter.token", (err, user) => done(err,user));
});

// Exporting our configured passport
module.exports = passport;
