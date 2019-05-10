import axios from "axios";

export default {
  getTweets: function(screen_name) {
    return axios.get("/api/profile", { params: { screen_name: screen_name } });
  }
};