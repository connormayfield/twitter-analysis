const axios = require("axios")


export default {
    //function will take tweet parameter to create a entry for Sentiment model
   create: function(comment){
       return axios.post("api/sentiment/", tweet)
    },

    //function will find existing sentiment report for existing tweet
    find: function(commentID){
        return axios.get("api/sentiment/:id", )
    },


}