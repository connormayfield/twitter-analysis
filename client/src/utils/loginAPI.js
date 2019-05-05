const axios = require("axios")

export default {
    signup: function(signupInfo){
        axios.post("/api/signup", signupInfo)
    },

    login: function(loginInfo){
        axios.post("/api/login", loginInfo)
    }
}