const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt-nodejs");

// User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
	
	// This will be changed to the Oauth token that twitter gives us
    twitter_username: {
        type: String,
        require: true
    },

	// A list of tweets that the user has pulled and wants information on
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
      }
    ]
});

userSchema.plugin(uniqueValidator)

userSchema.methods.validPassword = function(password){
    let user = this
    return bcrypt.compareSync(password, user.password)
}


userSchema.pre("save", function(next){
    var user = this;
    if (!user.isModified('password')) {
        return next();
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, null, (error, hash) => {
          if (error) {
            return next(error);
          }
          console.log('HASH: ', hash);
          user.password = hash;
          console.log('USER.PASSWORD: ', user.password);
          next();
        });
      });
});

const User = mongoose.model("User", userSchema);

module.exports = User;

