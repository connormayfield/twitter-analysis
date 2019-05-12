const db = require("../models")
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'P1W0cgiiR0inKGh9JYlty1FFO',
    consumer_secret: 'VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ',
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAPF1%2BQAAAAAA5nnHqs8mtuTGENA1i0aJJ6ovZHE%3DWkz1XObzIRYbbJORPQlleU7lTqAQFidBcZfXVFF8o0HCil0VyH"
  });

module.exports = {
    storeTweets(req, res){
        console.log(req.params.screen_name)
        let params = {screen_name: req.params.screen_name, count: "10", excludes_replies: "false"};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log(error)
                res.json(error);
            }
            else {   
                console.log("got tweets")
                tweetsArr = []
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
                            res.send("Tweets stored")
                        })
                    })
            }
        });
    },

}