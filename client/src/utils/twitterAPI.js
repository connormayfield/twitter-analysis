import axios from "axios";

export default {

  getTweets: function(username, screen_name) {
    return axios.get("/api/tweets/"+username+"/"+screen_name);
   
  }
};