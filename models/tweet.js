const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate")
mongoose.Promise = Promise;


// Tweet model
const tweetSchema = new Schema({
    // The user's twitter handle, most likely will be used as 
    // the target for the sentiment
    handle: {
        type: String,
        required: true,
    },

    tweet_body: {
        type: String,
        required: true
    },

    // The number of likes the tweet has
    likes: {
        type: Number,
        required: true
    },

    // The number of retweets the tweet has gotten
    retweets: {
        type: Number,
        required: true
    },

    tweet_id: {
        type: String,
        required: true,
        unique: true
    },

    // This be a list of 5-10 tweets that the sentiment analysis will be run on
    // May combine into the Sentiment Model
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],

    // This will contain the emotional values for this tweet's comments
    sentiment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Sentiment"
        }
    ]
});

tweetSchema.plugin(findOrCreate)

const Tweet = mongoose.model("Tweet", tweetSchema);



module.exports = Tweet;
