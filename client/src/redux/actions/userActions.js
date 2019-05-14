import history from "../history";


const userLogin = username => ({
  type: "LOG_IN",
  username,
});

const userLogout = () => ({
  type: "LOG_OUT",
});


const twitterConnection = (twitterHandle) => ({
   
  type: "TWITTER_CONNECTED",
  twitterHandle
  });


export const doLogin = username => dispatch => {
  try {
    dispatch(userLogin(username));
    history.push("/home");
  } catch (error){
    throw(error);
  } finally {
  }
};

export const doLogout = () => dispatch => {
  dispatch(userLogout());
  history.push("/");
};


export const doTwitterConnect = (twitterHandle) => dispatch => {
  dispatch(twitterConnection(twitterHandle));

}





