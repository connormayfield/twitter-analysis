const db = require("../models")

module.exports = {
    create(req, res){
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            twitter_username: req.body.twitter_username
    
        }).then(function(data) {
    
            console.log(data)
            res.status(307).redirect("/login")
    
        }).catch(function(err) {
            res.json(err);
            
        });
    }
}