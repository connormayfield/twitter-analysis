import React, {Component} from "react"
import {Container, Row, Col} from "../components/Grid/index"

class Home extends Component{
    state = {
        username: "",
        loggedIn: false
    }

    render(){

        return(
            <Container>
                    <h1>Home Page</h1>
            </Container>
       
        )
    }
}

export default Home