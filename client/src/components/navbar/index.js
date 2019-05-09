import React from "react"
import {Link} from "react-router-dom"
import "./style.css";

export function Navbar({props}){

    return (
    
    <nav className="navbar navbar-lg navbar-dark bg-primary">
      <button className="navbar-toggler" id="toggle-sidebar" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">TweetTrace</Link>
    </nav>
  )
}

export default Navbar