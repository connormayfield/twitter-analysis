// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";

class Sidebar extends Component {
    
  logout = () => this.props.doLogout();

  render(){
    const { user } = this.props;
    if(user !== undefined && user.logged) {
      return (
        <div id="sidebar">
          <ul>
            <Link to="/home"><li>Home</li></Link>
            <Link to="/profile"><li>Twitter</li></Link>
            <Link to="/inprogress"><li>Instagram</li></Link>
            <Link to="/inprogress"><li>Facebook</li></Link>
            <Link to="/logout" onClick = {this.logout}><li>Logout</li></Link>
          </ul>
          <div className="side-image"></div>
        </div>
      )
    }
    return (
      <div >
      
      </div>
    );


  }
}

export default Sidebar;