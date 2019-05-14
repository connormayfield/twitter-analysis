const express = require("express");
const router = express.Router();
const sentimentController = require("../../../controllers/sentimentController")

router.route("/:username/:twitterHandle/:tweetID")
      .post(sentimentController.create)

module.exports = router;