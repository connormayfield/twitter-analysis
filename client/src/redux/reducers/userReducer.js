const initialState={
  username: "",
  twitterHandle: "",
  twitterConnected: false,
  logged:false,
  error: null
}

const userReducer=(state=initialState, action) => {
  console.log(action.type);
    switch (action.type) {
      
      case "LOG_IN": {
        return {...state, logged: true, username: action.username}
      } 

      case "TWTTIER_CONNECTED":{
        return {...state, twitterConnected: true, twitterHandle: action.twitterHandle}
        
      }
      // case "LOG_IN_ERROR": {
      //   return {...state,logged: false, error: action.error}
      // }

      case "LOG_OUT": {
        return initialState;
      }
    }
    return state
}

export default userReducer;
