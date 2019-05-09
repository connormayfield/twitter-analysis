import axios from "axios";

export default {
  getTweets: function(name) {
    return axios.get("/api/tweets", { params: { name: name } });
  }
};