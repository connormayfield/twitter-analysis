import axios from "axios";

export default {
<<<<<<< HEAD
  postTweets: function(username, screen_name) {


    return axios.post("/api/tweets/"+username+"/"+screen_name);

    // return axios.get("/api/tweets", { params: { screen_name: screen_name } });
  },

  getTweets: function(username, screen_name) {
    console.log(screen_name)
    return axios.get("/api/tweets/"+username+"/"+screen_name);
   
    // return axios.get("/api/tweets", { params: { screen_name: screen_name } });
=======
  getTweets: function(screen_name) {
    return axios.get("/api/profile", { params: { screen_name: screen_name } });
>>>>>>> 15b9bc2f962ca43dea663764be59ed9a1d562159
  }
};