const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Twitter = require("passport-twitter");
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
            if (!dbUser || !dbUser.validPassword(password)) {
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

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Twitter({
    consumerKey: "P1W0cgiiR0inKGh9JYlty1FFO",
    consumerSecret: "VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ",
    callbackURL: '/api/user/connect/twitter/callback'
    // proxy: true
  },
  function(token, tokenSecret, profile, done) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log(profile);
    // When a user tries to sign in this code runs
    User.findOne({
        username: profile.name
    })
    .then(dbUser => {
        // If there's no user with the given
        if (!dbUser) {
            return done(null, false, {
                message: "User doesn't have an account"
            });
        } else if (dbUser.twitter.id) {

            // Twitter is already connected
            return done(null, false, {
                message: "Twitter is already connected"
            });
        } else {

            // Update user model to include twitter info
            dbUser.twitter.id = profile.id;
            dbUser.twitter.token = token;
            dbUser.twitter.displayName = profile.name;
            dbUser.twitter.handle = profile.screen_name;
            // dbUser.twitter.photo = profile.profile_image_url || '';

            connectTwitter(dbUser);

            return done(null, profile);
        }
    })
    
  }));

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
