const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  tweetBody: { type: String },
  likes: { type: String },
  retweets: { type: String },
  topLevelComments : { type: String },
  sentiment: { type: String },
  date: { type: Date, default: Date.now }
});

const tweet = mongoose.model("Tweet", tweetSchema);

module.exports = tweet;