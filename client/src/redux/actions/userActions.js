import axios from "axios";
import loginApi from "../../utils/loginAPI";
import history from "../history";

// function checkUser() {
//   // return function(dispatch) {
//   //   dispatch({type: "LOGGING_IN"});
    
//   //   axios.get("http://rest.learncode.academy/api/reacttest/tweets")
//   //     .then((response) => {
//   //       dispatch({type: "LOG_IN", payload: response.data})
//   //     })
//   //     .catch((err) => {
//   //       dispatch({type: "LOG_IN_ERROR", payload: err})
//   //     })
//   // }
//   return {
//     type: "LOG_IN",
//     payload: {
//       name: "shirano2"
//     }
//   }
// }

const userLogin = username => ({
  type: "LOG_IN",
  username,
});

const userLogout = () => ({
  type: "LOG_OUT",
});

// const loginRequest = user => {
//   loginApi.login(user);
// }



// export const doLogin = username => async dispatch => {
export const doLogin = username => dispatch => {
  try {
    //const userResponse = await loginRequest(user);
    // console.log("doLogin");
    // console.log(userResponse);
    //dispatch(userLogin(userResponse));
    dispatch(userLogin(username));
    history.push("/profile");
  } catch (error) {
    throw(error);
  } finally {
  }
};

export const doLogout = () => dispatch => {
  dispatch(userLogout());
  history.push("/");
};




