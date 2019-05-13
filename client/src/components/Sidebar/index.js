// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";

class Sidebar extends Component {
  // state={
  //   isAuthenticated: false
  // }

  // logOut = () => {
  //   loginAPI.logout()

  // }
  // renderTag = () => {
  //   if(this.props.user===undefined ||this.props.user.logged===false) {
  //     this.setState({isAuthenticated:false})
  //   } else {
  //     this.setState({isAuthenticated:true})
  //   }
  // }
    
  logout = () => this.props.doLogout();

  render(){
    const { user } = this.props;
    if(user !== undefined && user.logged) {
      return (
        <div id="sidebar">
          <ul>
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/connections"><li>Connections</li></Link>
            <Link to="/logout" onClick = {this.logout}><li>Logout</li></Link>
          </ul>
          <div className="side-image"></div>
        </div>
      )
    }
    return (
      <div id="sidebar">
        <ul>
          <Link to="/login"><li>Login</li></Link>
          <Link to="/signup"><li>Signup</li></Link>
        </ul>
        <div className="side-image"></div>
      </div>
    );


  }
}

export default Sidebar;