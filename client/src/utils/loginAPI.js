const axios = require("axios")


export default {
    signup: function(signupInfo){
      console.log("xxxxx")
       return axios.post("api/user/signup", signupInfo)

    },

    login: function(loginInfo){
        console.log(loginInfo)
        return axios.post("api/user/login", loginInfo)
    },

    checkSession: function(){
        return axios.get("api/user/session")
    },

    logout: function(){
        return axios.get("api/user/logout")
    }
}
