const axios = require("axios")


export default {
    signup: function(signupInfo){
       return axios.post("api/user/signup", signupInfo)

    },

    login: function(loginInfo){
        console.log("yyy")
        return axios.post("api/user/", loginInfo)
    },

    checkSession: function(){
        return axios.get("api/user/session")
    },

    logout: function(){
        return axios.get("api/user/logout")
    },
    twitterConnect: function() {
        return axios.get("api/user/connect/twitter")
    }
}
