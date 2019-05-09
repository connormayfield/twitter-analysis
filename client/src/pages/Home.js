import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import sideBarScript from "../components/Sidebar/logic"

class Home extends Component{
    state = {
        username: "",
    }

    componentDidMount(){
        sideBarScript.sideBarController()

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