const express = require("express");
const router = express.Router();
const tweetController = require("../../../controllers/tweetController")

router.route("/:username/:tweetID")
      .post(tweetController.create)
      .get(tweetController.getTweets)




module.exports = router;