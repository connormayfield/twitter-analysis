const initialState={
  username: "",
  twitterHandle: "",
  twitterConnected: false,
  logged:false,
  error: null
}

const userReducer=(state=initialState, action) => {
    switch (action.type) {
      
      case "LOG_IN": {
        return {...state, logged: true, username: action.username}
      } 

      case "LOG_OUT": {
        return initialState;
      }

      default: {
        break;
      }
    }
    return state
}

export default userReducer;