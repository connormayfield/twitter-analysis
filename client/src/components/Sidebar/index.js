// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import loginAPI from "../../utils/loginAPI";
import "./style.css";
import sideImg from "./giphy.gif";

class Sidebar extends Component {
  state={
    isAuthenticated: false
  }

  logOut = () => {
    loginAPI.logout()

  }

  render(){
    
    return (
      <div id="sidebar">
        {/* <div className="toggle-btn" id="toggle-sidebar" onClick={this.toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div> */}
        <ul>
          <Link to="/"><li>Home</li></Link>
          {this.state.isAuthenticated ?  null : <Link to="/login"><li>Login</li></Link>}
          {this.state.isAuthenticated ?  null : <Link to="/signup"><li>Signup</li></Link>}
          {this.state.isAuthenticated ?  <Link to="/profile"><li>Profile</li></Link> : null}
          {this.state.isAuthenticated ?  <li>Tweet</li> : null}
          {this.state.isAuthenticated ?  <li>Sentiment</li> : null}
          {this.state.isAuthenticated ?  <Link to="/logout" onClick = {this.logOut}><li>Logout</li></Link> : null}
        </ul>
        <div className="side-image"></div>
      </div>
    );
  }
}

export default Sidebar;