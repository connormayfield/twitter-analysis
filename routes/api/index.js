const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
const twitterRoutes = require("./twitter/twitterRoutes");
const sentimentRoutes = require("./sentiment/sentimentRoutes")

router.use("/user", loginRoutes)
router.use("/profile", twitterRoutes)
router.use("/sentiment", sentimentRoutes)

module.exports = router