import React from "react"
import {Link} from "react-router-dom"
import { Container } from "../Grid";
import "./style.css";

export function Navbar({props}){

    return (
    
      <nav className="navbar navbar-dark bg-primary">
        <Container>
          <button className="navbar-toggler" id="toggle-sidebar" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">TweetTrace</Link>
        </Container>
      </nav>
    )
}

export default Navbar