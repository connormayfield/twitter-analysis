// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import loginAPI from "../../utils/loginAPI";
import "./style.css";

class Sidebar extends Component {
  state={
    toggle:"false"
  }


  toggleSidebar=()=> {
    if(this.state.toggle==="false") {
      document.querySelector(".wrapper").style.marginLeft = "200px"
      this.setState({toggle:"true"});
    } else {
      document.querySelector(".wrapper").style.marginLeft = "0px"
      this.setState({toggle:"false"});
    }
  };

  logOut = () => {
    loginAPI.logout()
    .then((res)=>{
      console.log(res)
    })


  }

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
          <Link to="/profile"><li>Profile</li></Link>
          <Link to="/tweets"><li>Twitter Feed</li></Link>
          <li>Sentiment</li>
          <Link to="/" onClick = {()=>{this.logOut()}}><li>Logout</li></Link> 
        </ul>
        <div className="side-image"></div>
      </div>
    );
  }
}

export default Sidebar;