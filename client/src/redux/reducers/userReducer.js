const initialState={
  username:"",
  logging:false,
  logged:false,
  error: null
}

const userReducer=(state=initialState, action) => {
  console.log(action.type);
    switch (action.type) {
      
      case "LOGGING_IN": {
        return {...state, logging: true, username: action.username}
      }
      case "LOG_IN": {
        return {...state, logging: false, logged: true, username: action.username}
      }
      case "LOG_IN_ERROR": {
        return {...state, logging: false, logged: false, error: action.error}
      }
      // case "CHANGE_USER_NAME": {
      //   return {
      //     ...state,
      //     user: {...state.user, name: action.username},
      //   }
      // }
      case "LOG_OUT": {
        return initialState;
      }
    }
    return state
}

export default userReducer;
