const db = require("../models")

module.exports = {
    create(req, res){
        console.log("creating user")
        console.log(req.body)
        db.User.create({
            username: req.body.username,
            password: req.body.password,                
        }).then(function(data) {
            console.log("redirect")
            res.redirect(307, "/api/user/")

        }).catch(function(err) {
            console.log(err)
            res.json(err);

        });
    }
}
