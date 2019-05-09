const express = require("express");
const loginController = require("../../../controllers/loginController")
const passport = require("../../../config/passport");
const router = express.Router();

//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/login", passport.authenticate("local"), function(req, res) {
    console.log("session")
    res.send(req.session);
})
//signing up account route
router.route("/signup")
        .post(loginController.create);

// Route for checking if the user has an existing session
router.get("/session", function(req, res) {
    // console.log("req.user", req.user)
    if(req.user){
        console.log("req.user", req.user)
        res.send(req.user);
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

//twitter
router.get('/connect/twitter',
  passport.authorize('twitter', { failureRedirect: '/' })
);
router.get('/connect/twitter/callback',
  passport.authorize('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
  })
);

module.exports = router;