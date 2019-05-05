const router = require("express").Router();
const loginRoutes = require("./login/loginRoutes");

router.use("/user", loginRoutes)

module.exports = router