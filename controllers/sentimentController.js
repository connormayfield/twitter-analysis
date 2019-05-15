const db = require("../models")
const Twitter = require('twitter');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2016-05-19',
  iam_apikey: 'NoDDc3PLy8G3e79x_i25IdBpDkEWB1ysafk9fESK4zG1',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});

// const clientMentions = new Twitter({
//   consumer_key: "P1W0cgiiR0inKGh9JYlty1FFO",
//   consumer_secret: "VsQtDnusGJrGDFpRB8WTs1wIKbGYYZzJ200YIkhLHRQj6apUVJ",
//   access_token_key: "",
//   access_token_secret: ""
// });

function calculatingEmotions(dbComments, es, ind = 0, cb){
  //Store score in Sentiment Model after calculating sentiment score
  if (ind === dbComments.length){
    let total = 0;
    for (var score in es){
       total += parseFloat(es[score])
    }
    es = {
      anger: (es.anger / total * 100).toFixed(2),
      disgust: (es.disgust / total * 100).toFixed(2),
      fear: (es.fear / total * 100).toFixed(2),
      joy: (es.joy / total * 100).toFixed(2),
      sadness: (es.sadness / total * 100).toFixed(2)
    }

    db.Sentiment.create({
      anger: es.anger,
      disgust: es.disgust,
      fear: es.fear,
      joy: es.joy,
      sadness: es.sadness
    })
    .then( ({ _id }) => {
           return cb(es, _id, null)
    })
   .catch(err => {
     console.log("Sentiment score cannot be calculated because there are no comments.")
     return cb(null, null, err)
    
    });  
  }
  //Calculate sentiment scores while iterating through comment Array
  else{
    const toneParams = {
      tone_input: { 'text': dbComments[ind] },
      content_type: 'application/json',
    };
    toneAnalyzer.tone(toneParams)
      .then(({document_tone}) => {
        let emotions = document_tone.tone_categories[0].tones
        es.anger += emotions[0].score;
        es.disgust += emotions[1].score;
        es.fear += emotions[2].score;
        es.joy += emotions[3].score;
        es.sadness += emotions[4].score
        ind++;
        calculatingEmotions(dbComments, es, ind, cb)
        })
        .catch(err => {
          console.log('error:', err)
          res.json(err);
        })
  }
}

function addComments(tweets, tweetID, ind, done){
  if(ind < tweets.length){
   
    if(tweets[ind].in_reply_to_status_id == tweetID){

      db.Comment.create({
        handle: tweets[ind].user.screen_name,
        comment_body: tweets[ind].text
      }).then(dbComments => {
          let commentID = dbComments._id;

          db.Tweet.findOneAndUpdate({
            tweet_id : tweetID
          },{
            $push : {comments : commentID}
          }).then(dbTweet => {
            ind++;
            addComments(tweets, tweetID, ind, done)
          })

        })
      } else{
            ind++;
              addComments(tweets, tweetID, ind, done)
      }

    }
  else{
     done("done")
  }
}

  

module.exports = {
//Function will create a sentiment document for a particular tweet. First, it will pull the comments associated with that tweet. IBM Tone analyzer will add all the emotion scores for each comment. The sentiment will be added to the sentiment model and then to Tweet model.
  create(req, res){
    console.log(req.params);

      let emotionScore = {
        anger: 0,
        disgust: 0,
        sadness: 0,
        joy: 0, 
        fear: 0
      }

      db.User.findOne({
        username : req.params.username})
        .populate("tweets")
        .then((dbUser) => {

          console.log(dbUser);
          // console.log(clientMentions)
          // clientMentions.access_token_key = dbUser.twitter.token;
          // clientMentions.access_token_secret = dbUser.twitter.tokenSecret;


          let clientMentions = new Twitter({
            consumer_key: "4D371g3g31jj8KagqUFEiIBQa",
            consumer_secret: "wwXQN7yyUSz16WkHCzLuqUc7r5QlWTkNdQMXHGWNd8ZRfmm2k6",
            access_token_key: dbUser.twitter.token,
            access_token_secret: dbUser.twitter.tokenSecret
          });

          console.log(clientMentions)
          

          const params = {screen_name: req.params.tweetHandle, count: "10"};
          clientMentions.get('statuses/mentions_timeline', function(error, tweets, response) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(tweets)
                  addComments(tweets, req.params.tweetID, 0, function(){

                    
                    db.Tweet.find({
                      tweet_id: req.params.tweetID
                    })
                    .populate("comments")
                    .then((dbTweet) => {
                      let commentObj = dbTweet[0].comments;
                      let comments = []
                      commentObj.forEach(element => {
                        comments.push(element.comment_body)
                      });
                      calculatingEmotions(comments, emotionScore, 0, function(emotionScore, sentimentID, err){
                        if(err){
                          return res.json(err)
                        }
                        db.Tweet.update({
                          tweet_id: req.params.tweetID
                        }, {
                            $set: {
                           sentiment: sentimentID
                         }
                        }).then((data) => {          
                          res.json(emotionScore)
                        })
                        .catch(err => {
                          res.json(err)
                        });
                      })
                    })
                  .catch((err)=>{
                    res.json(err)
                  })
                })
              }
            })
        })
        .catch(err => {
          console.log(err)
        })
         
    },
}