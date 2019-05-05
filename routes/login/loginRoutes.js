var express = require("express");
var db = require("../../models");
var passport = require("../../config/passport");

var router = express.Router();
// passport.authenticate
console.log(db.User)
//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.send("logged in")
    res.json("/members");
});

//signing up account route
router.post("/api/signup", function(req, res) {
    console.log(req.body)

    db.User.create({

        username: req.body.username,
        password: req.body.password,
        twitter_username: req.body.twitter_username

    }).then(function(data) {
        console.log(data)
        res.send("signed up")

    }).catch(function(err) {
        res.send(err);
        
    });
});


// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;