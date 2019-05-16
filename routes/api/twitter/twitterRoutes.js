const express = require("express");
const router = express.Router();
const Twitter = require('twitter');
const db = require("../../../models")
const moment = require("moment")

const updateWeeklyGraph = (tweetsArr) => {
    let weeklyData = new Array(7);
    let labels = [];
    for (let i = 0; i < 7; i++){
        labels.unshift(moment().subtract(i, 'days').format("dddd"));
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
                    weeklyData[3] = {favorites: tweet.favorites, retweets: tweet.retweets};
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
};

const clientTweets = new Twitter({
  consumer_key: 'P1W0cgiiR0inKGh9JYlty1FFO',
  consumer_secret: 'VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ',
  bearer_token: "AAAAAAAAAAAAAAAAAAAAAPF1%2BQAAAAAA5nnHqs8mtuTGENA1i0aJJ6ovZHE%3DWkz1XObzIRYbbJORPQlleU7lTqAQFidBcZfXVFF8o0HCil0VyH"
});

const insertTweets = (tweets, username, done, ind = 0) => {
    console.log("inserting tweets")
    console.log(ind)
    if(ind < tweets.length){
        tweets.forEach( tweet => {
            console.log(tweet)
            db.Tweet.findOrCreate({tweet_id : tweet.tweet_id}, tweet).then((dbTweet) => {
                db.User.update({username : username},
                    { $push:
                {tweets: dbTweet.tweet_id}
                }).then((dbUser) => {
                    ind++;
                    insertTweets(tweets, username, done, ind)
                })
                .catch( err => console.log(err))
            }) 
        })
    }
    else{
        done()
    }
}




router.get("/:username/:screen_name", (req, res)=>{
    
    // <----------This is the user's timeline request alone---------->
    const params = {screen_name: req.params.screen_name, count: "10", exclude_replies: "false"};
    clientTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
            res.json(error);
<<<<<<< HEAD
        } else {  
                let username = req.params.username;
=======
        } else {   
            // console.log(tweets);
            db.Tweet.deleteMany({}).then(data => {
>>>>>>> a45d3cfd7ed985c66c157f63676d272cfcda6ec8
                let tweetsArr = [];
                let today = new Date(moment().add(1, "days").format('L'))
                let aWeekAgo = new Date(moment().subtract(1, "weeks").format('L'))
                // console.log(today)
                let weeklyTweets = tweets.filter((t)=>{
                    return (new Date(t.created_at) <= today && new Date(t.created_at) > aWeekAgo) &&(t. in_reply_to_status_id === null);
                })
<<<<<<< HEAD


=======
                // console.log(weeklyTweets[0])
>>>>>>> a45d3cfd7ed985c66c157f63676d272cfcda6ec8
                for (let i = 0; i < weeklyTweets.length; i++){
                    let tweetObj = {
                        handle: weeklyTweets[i].user.screen_name,
                        tweet_body: weeklyTweets[i].text,
                        likes: weeklyTweets[i].favorite_count,
                        retweets: weeklyTweets[i].retweet_count,
                        tweet_id: weeklyTweets[i].id
                    };
                    tweetsArr.push(tweetObj);
                }
<<<<<<< HEAD
                insertTweets(tweetsArr, username, function(){
                    console.log("xxx")
                    let user = weeklyTweets[0].user;
    
                    let newTweets = [];

                    for(let i = 0; i < weeklyTweets.length; i++){
                        let oneTweet = {};
                        oneTweet.id = weeklyTweets[i].id;
                        oneTweet.created_at = moment(weeklyTweets[i].created_at).format("MMM DD YYYY");
                        oneTweet.text = weeklyTweets[i].text;
                        oneTweet.retweets = weeklyTweets[i].retweet_count;
                        oneTweet.favorites = weeklyTweets[i].favorite_count;
                        oneTweet.name = weeklyTweets[i].user.name;
                        oneTweet.screen_name = weeklyTweets[i].user.screen_name;
                        oneTweet.user_id = weeklyTweets[i].user.id;

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

                //     console.log(tweetsArr)
                // db.Tweet.create(tweetsArr)  
                //         .then(dbTweet => {
=======
                // console.log(weeklyTweets[0].user)
                if (tweetsArr.length === 0) {
                    return res.json({
                        user: tweets[0].user,
                        weeklyData: "none"
                    })
                }
                db.Tweet.create(tweetsArr)  
                        .then(dbTweet => {
>>>>>>> a45d3cfd7ed985c66c157f63676d272cfcda6ec8
                          
                //         let tweetIDArr = []
                //        for(let i = 0; i < dbTweet.length; i++){
                //             tweetIDArr.push(dbTweet[i]._id);
                //        }
                //        db.User.update({username : req.params.username},
                //                 {
                //             tweets: tweetIDArr
                //             }).then((dbUser) => {
    
                //           let user = weeklyTweets[0].user;
    
                //           let newTweets = [];
    
                //           for(let i = 0; i < weeklyTweets.length; i++){
                //               let oneTweet = {};
                //               oneTweet.id = weeklyTweets[i].id;
                //               oneTweet.created_at = moment(weeklyTweets[i].created_at).format("MMM DD YYYY");
                //               oneTweet.text = weeklyTweets[i].text;
                //               oneTweet.retweets = weeklyTweets[i].retweet_count;
                //               oneTweet.favorites = weeklyTweets[i].favorite_count;
                //               oneTweet.name = weeklyTweets[i].user.name;
                //               oneTweet.screen_name = weeklyTweets[i].user.screen_name;
                //               oneTweet.user_id = weeklyTweets[i].user.id;
    
                //               newTweets.push(oneTweet);
                //               }
                            
                //             let {labels, weeklyData} =  updateWeeklyGraph(newTweets);
    
                //             res.json({
                //                 user: user,
                //                 newTweets: newTweets,
                //                 labels: labels,
                //                 weeklyData: weeklyData
                //             });
                //             })
                //             .catch(err => {
                //                 res.json(err);
                //             });
                //  });
               

        }
    });
})


module.exports = router;


 



