import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import Sidebar from "../components/Sidebar";

class Home extends Component{
    state = {
        username: "",
    }

    render(){

        return(
            <div>
            <Sidebar/>
            <Container>
                    <h1>Home Page</h1>
            </Container>
            </div>

       
        )
    }
}

export default Home