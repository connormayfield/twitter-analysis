import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import Sidebar from "../components/Sidebar";

class Home extends Component{
    state = {
        username: "",
    }

    render(){
        if(this.props.user.logged===true) {   
            console.log("")
            return(
                <Container>
                        <h1>Home Page {this.props.user.username} </h1>
                </Container>
            )
        }
        
        return(
            <Container>
                <h1>Home Page {this.state.username} </h1>
            </Container>
        )
    }
}

export default Home