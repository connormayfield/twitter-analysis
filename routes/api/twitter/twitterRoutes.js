const express = require("express");
const router = express.Router();
const Twitter = require('twitter');
const db = require("../../../models")
const moment = require("moment")

const updateWeeklyGraph = (tweetsArr) => {
    let weeklyData = new Array(7);
    let today = moment().subtract(6, 'days').format("dddd")
    let labels = [];
    for (let i = 0; i < 7; i++){
        labels.unshift(moment().subtract(i, 'days').format("dddd"))
    }
    tweetsArr.forEach(tweet => {
        //Gathering "retweet" data and "favorites" data
        let day = moment(tweet.created_at).format("dddd");
        
        switch (day){
            case(labels[0]):
                if (weeklyData[0] === undefined){
                    weeklyData[0] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[0].favorites += tweet.favorites;
                    weeklyData[0].retweets  += tweet.retweets;
                }
                break;

                case(labels[1]):
                if (weeklyData[1] === undefined){
                    weeklyData[1] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[1].favorites += tweet.favorites;
                    weeklyData[1].retweets += tweet.retweets;
                }
                break;

                case(labels[2]):
                if (weeklyData[2] === undefined){
                    weeklyData[2] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[2].favorites += tweet.favorites;
                    weeklyData[2].retweets += tweet.retweets;
                }
                break;

                case(labels[3]):
                if (weeklyData[3] === undefined){
                    weeklyData[3] = {favorites: tweet.favorites, retweets: tweet.retweets}
                }else {
                    weeklyData[3].favorites += tweet.favorites;
                    weeklyData[3].retweets += tweet.retweets;
                }
                break;

                case(labels[4]):
                if (weeklyData[4] === undefined){
                    weeklyData[4] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[4].favorites += tweet.favorites;
                    weeklyData[4].retweets += tweet.retweets;
                }
                break;

                case(labels[5]):
                if (weeklyData[5] === undefined){
                    weeklyData[5] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[5].favorites += tweet.favorites;
                    weeklyData[5].retweets += tweet.retweets;
                }
                break;

                case(labels[6]):
                if (weeklyData[6] === undefined){
                    weeklyData[6] = {favorites: tweet.favorites, retweets: tweet.retweets};
                }else {
                    weeklyData[6].favorites += tweet.favorites;
                    weeklyData[6].retweets += tweet.retweets;
                }
                break;
                
                default:
                break;
        }
    });

    return {labels: labels,  weeklyData: weeklyData};
}

const clientTweets = new Twitter({
  consumer_key: 'P1W0cgiiR0inKGh9JYlty1FFO',
  consumer_secret: 'VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ',
  bearer_token: "AAAAAAAAAAAAAAAAAAAAAPF1%2BQAAAAAA5nnHqs8mtuTGENA1i0aJJ6ovZHE%3DWkz1XObzIRYbbJORPQlleU7lTqAQFidBcZfXVFF8o0HCil0VyH"
});

router.get("/:username/:screen_name", (req, res)=>{
    
    // <----------This is the user's timeline request alone---------->
    const params = {screen_name: req.params.screen_name, count: "20", exclude_replies: "false"};
    clientTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
            res.json(error)
        } else {   
            db.Tweet.deleteMany({}).then(data => {
                let tweetsArr = []
                for (let i = 0; i < tweets.length; i++){
                    let tweetObj = {
                        handle: tweets[i].user.screen_name,
                        tweet_body: tweets[i].text,
                        likes: tweets[i].favorite_count,
                        retweets: tweets[i].retweet_count,
                        tweet_id: tweets[i].id
                    }
                    tweetsArr.push(tweetObj)
                }
                    // console.log(tweetsArr)
                db.Tweet.create(tweetsArr)  
                        .then(dbTweet => {
                          
                        let tweetIDArr = []
                       for(let i = 0; i < dbTweet.length; i++){
                            tweetIDArr.push(dbTweet[i]._id)
                       }
                       db.User.update({username : req.params.username},
                                {
                            tweets: tweetIDArr
                            }).then((dbUser) => {
    
                          let user = tweets[0].user;
    
                          let newTweets = [];
    
                          for(let i = 0; i < tweets.length; i++){
                              let oneTweet = {};
                              oneTweet.id = tweets[i].id;
                              oneTweet.created_at = moment(tweets[i].created_at).format("MMM DD YYYY");
                              oneTweet.text = tweets[i].text;
                              oneTweet.retweets = tweets[i].retweet_count;
                              oneTweet.favorites = tweets[i].favorite_count;
                              oneTweet.name = tweets[i].user.name;
                              oneTweet.screen_name = tweets[i].user.screen_name;
                              oneTweet.user_id = tweets[i].user.id;
    
                              newTweets.push(oneTweet);
                              }
                            
                            let {labels, weeklyData} =  updateWeeklyGraph(newTweets);
    
                            res.json({
                                user: user,
                                newTweets: newTweets,
                                labels: labels,
                                weeklyData: weeklyData
                            });
                            })
                            .catch(err => {
                                res.json(err)
                            });
                 });
            })       

        }
    });
})


module.exports = router;


 



