const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sentiment model
const sentimentSchema = new Schema({
    // A decimal representation of each emotional returned from the API
    // Number type may need to change as I don't currently know if Number supports Float
    joy: {
        type: Number,
        required: true
    },

    fear: {
        type: Number,
        required: true
    },

    anger: {
        type: Number,
        required: true
    },

    sadness: {
        type: Number,
        required: true
    },

    disgust: {
        type: Number,
        required: true
    }
});

const Sentiment = mongoose.model("Sentiment", sentimentSchema);

module.exports = Sentiment;