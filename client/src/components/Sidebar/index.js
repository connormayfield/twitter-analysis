// import React from "react";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import loginAPI from "../../utils/loginAPI";
import "./style.css";

class Sidebar extends Component {
  state={
    isAuthenticated: false,
    toggle:"false"
  }

  componentDidMount(){
    loginAPI.checkSession()
    .then((res)=> {
        if(res.data){
            return this.setState({isAuthenticated: true})
        }
    })
    .catch((err) => console.log(err))
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
<<<<<<< HEAD
          {this.state.isAuthenticated ?  null :(<Link to="/login"><li>Login</li></Link>)}
          {this.state.isAuthenticated ?  null : (<Link to="/signup"><li>Signup</li></Link>)}
          {this.state.isAuthenticated ?  <Link to="/profile"><li>Profile</li></Link> : null}
          {this.state.isAuthenticated ?  <li>Tweet</li> : null}
          {this.state.isAuthenticated ?  <li>Sentiment</li> : null}
          {this.state.isAuthenticated ?  <Link to="/logout" onClick = {this.logOut}><li>Logout</li></Link> : null}
=======
          <Link to="/login"><li>Login</li></Link>
          <Link to="/signup"><li>Signup</li></Link>
          <Link to="/profile"><li>Profile</li></Link>
          <Link to="/weekly"><li>Weekly</li></Link>
          <li>Tweet</li>
          <li>Sentiment</li>
>>>>>>> 16f1e62aeef1ae31c2c6ec1856a3e5662aec320f
        </ul>
        <div className="side-image"></div>
      </div>
    );
  }
}

export default Sidebar;