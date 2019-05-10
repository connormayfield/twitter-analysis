import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import Sidebar from "../components/Sidebar";

class Home extends Component{
    state = {
        username: "",
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