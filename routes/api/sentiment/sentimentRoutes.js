const express = require("express");
const router = express.Router();
const sentimentController = require("../../../controllers/sentimentController")

router.route("/:username/:tweetID")
      .post(sentimentController.create)
      .get(sentimentController.getSentimentScore)




module.exports = router;