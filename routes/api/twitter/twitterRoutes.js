const tweetController = require("../../../controllers/tweetController")
const express = require("express");
const router = require("express").Router();
var Twitter = require('twitter');

// From the other twitter route D made... 
// const tweetController = require("../../../controllers/tweetController")

// router.route("/:username/:tweetID")
//       .post(tweetController.create)
//       .get(tweetController.getTweets)
 
var client = new Twitter({
  consumer_key: 'P1W0cgiiR0inKGh9JYlty1FFO',
  consumer_secret: 'VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ',
  bearer_token: "AAAAAAAAAAAAAAAAAAAAAPF1%2BQAAAAAA5nnHqs8mtuTGENA1i0aJJ6ovZHE%3DWkz1XObzIRYbbJORPQlleU7lTqAQFidBcZfXVFF8o0HCil0VyH"
});

// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// {
//     "token_type":"bearer",
//     "access_token":"AAAAAAAAAAAAAAAAAAAAAPF1%2BQAAAAAA5nnHqs8mtuTGENA1i0aJJ6ovZHE%3DWkz1XObzIRYbbJORPQlleU7lTqAQFidBcZfXVFF8o0HCil0VyH"
// }

router.route("/:username/:screen_name")
      .post(tweetController.storeTweets)
      .get(tweetController.getTweets)



// router.get("/:username/:screen_name", (req, res) => {
//   console.log(req.params.screen_name)
//     var params = {screen_name: req.params.screen_name, count: "10", excludes_replies: "false"};
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (error) {
//             console.log(error)
//             res.json(error);
//         }
//         else {
//             console.log(response);
//             console.log(tweets);
//             res.json({ tweets });
            
//         }
//     });

// });

module.exports = router;


 



