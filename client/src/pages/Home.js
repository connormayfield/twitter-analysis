import React, {Component} from "react"
import {Container} from "../components/Grid/index"

class Home extends Component{
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
                <h1>Home Page</h1>
            </Container>
        )
    }
}

export default Home