import React, { Component } from "react";
import {Link} from "react-router-dom"
import { Container } from "../Grid";
import "./style.css";

class Navbar extends Component {

    logout = () => this.props.doLogout();


    render() {
      const { user } = this.props;
      console.log(user);
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
          <Container>
            <button id="toggle-sidebar" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/connections">TweetTrace</Link>
              <div className="collapse navbar-collapse" id="navbarText">
                { (user !== undefined && user.logged) ?
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Profile
                      </a>

                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/connections" className="dropdown-item">Connections Home</Link>
                        <Link to="/profile" className="dropdown-item">Twitter</Link>
                        <Link to="/inprogress" className="dropdown-item">Instagram</Link>
                        <Link to="/inprogress" className="dropdown-item">Facebook</Link>
                        <div className="dropdown-divider" className="dropdown-item"></div>
                        <Link to="/logout" onClick = {this.logout} className="dropdown-item">Logout</Link>
                      </div>
                    </li>
                  </ul>
                :
                  // <ul className="navbar-nav ml-auto">
                  //   <Link to="/login"><li className="nav-link">Login</li></Link>
                  //   <Link to="/signup"><li className="nav-link">Sign Up</li></Link>
                  // </ul>
                  <ul></ul>
                }
            </div>
          </Container>
        </nav>
      )
    }
}

export default Navbar