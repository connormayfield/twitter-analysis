const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
<<<<<<< HEAD
const twitterRoutes = require("./twitter/twitterRoutes");

router.use("/user", loginRoutes)
router.use("/tweets", twitterRoutes)
=======
const sentimentRoutes = require("./sentiment/sentimentRoutes")
const tweetRoutes = require("./tweet/tweetRoutes")

router.use("/user", loginRoutes)
router.use("/sentiment", sentimentRoutes)
router.use("/tweet", tweetRoutes)

>>>>>>> master

module.exports = router