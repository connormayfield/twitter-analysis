const Twitter = require('twitter');
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
        let params = {screen_name: req.params.screen_name, count: "50", excludes_replies: "false"};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log(error);
                res.json(error)
            } else {          
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
                            .catch(err => res.json(err))
        });
    
        }
        })
    }
}




// router.get("/:username/:screen_name", (req, res) => {
//     // <----------This is the user's timeline request alone---------->
//     var params = {screen_name: req.params.screen_name, count: "20", exclude_replies: "false"};
//     clientTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (error) {
//             console.log(error);
//             res.json(error)
//         } else {          
//             let tweetsArr = []
//             for (let i = 0; i < tweets.length; i++){
//                 let tweetObj = {
//                     handle: tweets[i].user.screen_name,
//                     tweet_body: tweets[i].text,
//                     likes: tweets[i].favorite_count,
//                     retweets: tweets[i].retweet_count,
//                     tweet_id: tweets[i].id
                    
//                 }
//                 tweetsArr.push(tweetObj)
//             }
//             db.Tweet.create(tweetsArr)
//                 .then(dbTweet => {
//                     let tweetIDArr = []
//                    for(let i = 0; i < dbTweet.length; i++){
//                         tweetIDArr.push(dbTweet[i]._id)
//                    }
//                    db.User.update({username : req.params.username},
//                         {tweets: tweetIDArr}
//                     ).then((dbUser) => {

//                       let user = tweets[0].user;

//                       let newTweets = [];

//                       for(let i = 0; i < tweets.length; i++){
//                           let oneTweet = {};
//                           oneTweet.id = tweets[i].id;
//                           oneTweet.created_at = moment(tweets[i].created_at).format("MMM DD YYYY");
//                           oneTweet.text = tweets[i].text;
//                           oneTweet.retweets = tweets[i].retweet_count;
//                           oneTweet.favorites = tweets[i].favorite_count;
//                           oneTweet.name = tweets[i].user.name;
//                           oneTweet.screen_name = tweets[i].user.screen_name;
//                           oneTweet.user_id = tweets[i].user.id;

//                           newTweets.push(oneTweet);
//                           }
                        
//                         let {labels, weeklyData} =  updateWeeklyGraph(newTweets);

//                         res.json({
//                             user: user,
//                             newTweets: newTweets,
//                             labels: labels,
//                             weeklyData: weeklyData
//                         });

//         })
//         .catch(err => res.json(err))
//     });

//     }
//     })
// });
