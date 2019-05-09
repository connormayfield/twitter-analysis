const axios = require("axios")


export default {
    signup: function(signupInfo){
       return axios.post("api/user/signup", signupInfo)
    },

    login: function(loginInfo){
        return axios.post("api/user/login", loginInfo)
    },

    checkSession: function(){
        return axios.get("api/user/session")
    },

    logout: function(){
        return axios.get("api/user/logout")
    }
}