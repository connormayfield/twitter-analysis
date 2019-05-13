const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
const twitterRoutes = require("./twitter/twitterRoutes");
const sentimentRoutes = require("./sentiment/sentimentRoutes")
const twitterAuthRoutes = require("./twitterAuth/twitterAuthRoutes");

router.use("/user", loginRoutes)
router.use("/tweets", twitterRoutes)
router.use("/sentiment", sentimentRoutes)
router.use("/auth/twitter", twitterAuthRoutes)

module.exports = router