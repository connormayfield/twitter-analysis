const db = require("../models");

// Defining methods for the User Model
module.exports = {
    findAll: function(req, res) {
        db.User()
            .find({}, "-password")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findUser: function(req, res) {
        db.User
            .findById(req.params.id, "-password")
            .then(dbModel => res.json())
            .catch(err => res.status(422).json(err));
    },
    findUserTweets: function(req, res) {
        db.User
            .findById(req.params.id, "tweets")
            .populate("tweets")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    newTweet: function(req, res) {
        db.Tweet
            .create(req.body)
            .then(dbTweet => {
                return db.User.findOneAndUpdate({ _id: req.params.id }, 
                                                { $push: { tweets: dbTweet._id } },
                                                { new: true });
            })
            .catch(err => res.status(422).json(err));
    },
    connectTwitter: function(req, res) {
        db.User
            .update({ username: req.body.username }, req.body)
            .then(dbUser => res.json({ success: true }))
            .catch(err => res.status(422).json(err));
    }
}