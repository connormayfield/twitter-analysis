const axios = require("axios")


export default {
    //function will take tweet parameter to create a entry for Sentiment model
   create: function(comment){
       return axios.post("api/sentiment/:username/:tweetID")
    },

    //function will find existing sentiment report for existing tweet
    find: function(commentID){
        return axios.get("api/sentiment/:username/:tweetID", )
    },


}