import axios from "axios";

export default {
  postTweets: function(username, screen_name) {


    return axios.post("/api/tweets/"+username+"/"+screen_name);

    // return axios.get("/api/tweets", { params: { screen_name: screen_name } });
  },

  getTweets: function(username, screen_name) {
    console.log(screen_name)
    return axios.get("/api/tweets/"+username+"/"+screen_name);
   
    // return axios.get("/api/tweets", { params: { screen_name: screen_name } });
  }
};