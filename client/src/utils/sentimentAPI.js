const axios = require("axios")


export default {
    //function will take tweet parameter to create a entry for Sentiment model
   create: function(username, twitterHandle, tweetID, done){
       
        done();
        return axios.post("api/sentiment/"+username+"/"+twitterHandle+"/"+tweetID)

    },
}