const express = require("express");
const router = express.Router();
const sentimentController = require("../../../controllers/sentimentController")

router.route("/")
      .post(sentimentController.create)



module.exports = router;