const tweetController = require("../../../controllers/tweetController")
const express = require("express");
const router = require("express").Router();
var Twitter = require('twitter');
const db = require("../../../models/")

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

router.get("/:username/:screen_name", (req, res) => {
    // <----------This is the user's timeline request alone---------->
    console.log(req.params.screen_name)
    var params = {screen_name: req.params.screen_name, count: "10", exclude_replies: "false"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
            res.json(error)
        } else {
        //   console.log(tweets)
          
            let tweetsArr = []
            for (let i = 0; i < tweets.length; i++){
                let tweetObj = {
                    handle: tweets[i].user.screen_name,
                    tweet_body: tweets[i].text,
                    likes: tweets[i].favorite_count,
                    retweets: tweets[i].retweet_count
                }
                tweetsArr.push(tweetObj)
            }
            db.Tweet.create(tweetsArr)
                .then(dbTweet => {
                    let tweetIDArr = []
                   for(let i = 0; i < dbTweet.length; i++){
                        tweetIDArr.push(dbTweet[i]._id)
                   }
                   db.User.update({username : req.params.username},
                        {tweets: tweetIDArr}
                    ).then((dbUser) => {
                      res.json(tweets);
                    })
                })
            
        }
    });
    
    // <----------This is the mentions request alone---------->
    // var params2 = {screen_name: req.query.screen_name, count: "10"};
    // client.get('statuses/mentions_timeline', params2, function(error, tweets, response) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(response);
    //         console.log("mentions.................");
    //         console.log({tweets});
    //         res.json({ tweets });
    //     }
    // });
    
    // <----------This should be the final request---------->
    // var params = {screen_name: req.query.screen_name, count: "10", excludes_replies: "false"};
    // var params2 = {screen_name: req.query.screen_name, count: "10"};
    // client.get('statuses/user_timeline', params, function(error, tweets, response) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         client.get('statuses/mentions_timeline', params2, function(error, tweets, response) {
    //              if (error) {
    //                  console.log(error);
    //              } else {
    //                  console.log(response);
    //                  console.log("mentions.................");
    //                  console.log({tweets});
    //                  res.json({ tweets });
    //              }
    //         });
    //     }
    // });
});

module.exports = router;


 



