const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sentimentSchema = new Schema({
  tweetId: { type: String, required: true, unique: true },
  joy: { type: String },
  fear: { type: String },
  anger: { type: String },
  sadness: { type: String },
  disgust: { type: String },
  date: { type: Date, default: Date.now }
});

const sentiment = mongoose.model("Sentiment", sentimentSchema);

module.exports = sentiment;