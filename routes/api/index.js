const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
const twitterRoutes = require("./twitter/twitterRoutes");

router.use("/user", loginRoutes)
router.use("/tweets", twitterRoutes)

module.exports = router