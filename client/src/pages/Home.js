import React, {Component} from "react"
import {Container} from "../components/Grid/index"

class Home extends Component{
    state = {
        username: "",
    }

    componentDidMount(){
        document.querySelector("#sidebar").className = "";
        document.querySelector(".wrapper").style.marginLeft = "0px"
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