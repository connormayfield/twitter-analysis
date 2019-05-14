const express = require("express");
const loginController = require("../../../controllers/loginController")
const passport = require("../../../config/passport");
const router = express.Router();

//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/", passport.authenticate("local"), function(req, res) {
    console.log("------session");

    res.send(req.session);
})
//signing up account route
router.route("/signup")
        .post(loginController.create);

// Route for checking if the user has an existing session
router.get("/session", function(req, res) {
        console.log("----session")
        console.log(req.user)
        res.json(req.user)
});

// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    console.log(req.user)
    res.redirect("/");
});

module.exports = router;