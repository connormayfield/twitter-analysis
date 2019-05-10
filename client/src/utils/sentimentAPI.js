const axios = require("axios")


export default {
    //function will take tweet parameter to create a entry for Sentiment model
   create: function(tweetID){
       return axios.post("api/sentiment/:tweetID")
    },

    //function will find existing sentiment report for existing tweet
    find: function(tweetID){
        return axios.get("api/sentiment/:tweetID", )
    },


}