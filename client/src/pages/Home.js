import React, {Component} from "react"
import {Container} from "../components/Grid/index"

class Home extends Component{
    state = {
        username: "",
        isAuthenicated: false
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