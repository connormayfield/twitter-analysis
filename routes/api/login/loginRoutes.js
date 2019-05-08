const express = require("express");
const loginController = require("../../../controllers/loginController")
const passport = require("../../../config/passport");
const router = express.Router();

//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.session);
})
//signing up account route
router.route("/signup")
        .post(loginController.create);

// Route for checking if the user has an existing session
router.get("/session", function(req, res) {
    // console.log("req.user", req.user)
    if(req.user){
        console.log("req.user", req.user)
        let userInfo = {
            username: req.user.username,
            twitter_username: req.user.twitter_username
        }
        res.send(userInfo)
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