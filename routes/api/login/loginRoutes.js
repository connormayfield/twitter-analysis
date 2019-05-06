var express = require("express");
var db = require("../../../models");
var passport = require("../../../config/passport");
var router = express.Router();

//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/login", passport.authenticate("local"), function(req, res) {

    // res.send("logged in")

    res.json(req.session);
})


//signing up account route
router.post("/signup", function(req, res) {
    console.log(req.body)

    db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        twitter_username: req.body.twitter_username

    }).then(function(data) {

        console.log(data)
        res.status(307).redirect("/login")

    }).catch(function(err) {
        console.log(err)
        res.json(err);
        
    });
});

// Route for checking if the user has an existing session
router.get("/session", function(req, res) {
    console.log("req.user", req.user)
    if(req.user){
        console.log("req.user", req.user)
        res.send(true)
    }
    else{
        res.send(false)
    }
});


// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;