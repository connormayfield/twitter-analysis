const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");
const sentimentRoutes = require("./sentiment/sentimentRoutes")

router.use("/user", loginRoutes)
router.use("/sentiment", sentimentRoutes)


module.exports = router