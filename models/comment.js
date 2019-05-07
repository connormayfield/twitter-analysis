const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// Comment model
const commentSchema = new Schema({
    // The commenter's twitter handle
    handle: {
        type: String,
        required: true,
    },

    // The text that the sentiment will be run on.
    comment_body: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;