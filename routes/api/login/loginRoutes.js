const express = require("express");
const loginController = require("../../../controllers/loginController")
const passport = require("../../../config/passport");
const router = express.Router();

//LOGIN ROUTES======================================================================================================

//logging in route
router.post("/login", passport.authenticate("local"), function(req, res) {
    console.log("------session")
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
    console.log(req.user)
    res.redirect("/");
});

const CLIENT_HOME_PAGE_URL = "http://127.0.0.1:3000/"
//twitter
router.route('/connect/twitter')
    .get((req, res, next) => {console.log("test"); next()},
		passport.authorize('twitter', { failureRedirect: 'http://127.0.0.1:3000/' })
    );
router.route('/connect/twitter/callback')
    .get((req, res, next) => {console.log("test"); next()},
		passport.authorize('twitter', {
			successRedirect : CLIENT_HOME_PAGE_URL,
			failureRedirect : '/api/user/connect/twitter/failed'
		})
	);
	
// when login failed, send failed msg
router.route("/connect/twitter/failed")
	.get((req, res) => {
		res.status(401).json({
		success: false,
		message: "user failed to authenticate."
		});
	});

module.exports = router;