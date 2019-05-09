import axios from "axios";

export default {
  getTweets: function(screen_name) {
    return axios.get("/api/tweets", { params: { screen_name: screen_name } });
  }
};