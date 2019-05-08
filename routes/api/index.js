const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
const sentimentRoutes = require("./sentiment/sentimentRoutes")
const tweetRoutes = require("./tweet/tweetRoutes")

router.use("/user", loginRoutes)
router.use("/sentiment", sentimentRoutes)
router.use("/tweet", tweetRoutes)


module.exports = router