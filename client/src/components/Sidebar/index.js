// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";

class Sidebar extends Component {
  state={
    toggle:"false"
  }

  toggleSidebar=()=> {
    if(this.state.toggle==="false") {
      this.setState({toggle:"true"});
    } else {
      this.setState({toggle:"false"});
    }
  };

  render(){
    return (
      <div id="sidebar" className={this.state.toggle==="false"?"":"active"}>
        <div className="toggle-btn" onClick={this.toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <Link to="/"><li>Home</li></Link>
          <Link to="/login"><li>Login</li></Link>
          <Link to="/signup"><li>Signup</li></Link>
          <Link to="/profile"><li>Profile</li></Link>
          <li>Tweet</li>
          <li>Sentiment</li>
        </ul>
        <div className="side-image"></div>
      </div>
    );
  }
}

export default Sidebar;