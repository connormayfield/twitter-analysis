const axios = require("axios")


export default {
    signup: function(signupInfo){
       return axios.post("api/user/signup", signupInfo)
    },

    login: function(loginInfo){
        console.log(loginInfo)
        return axios.post("api/user/login", loginInfo)
    }
}