import React, {Component} from "react"
import {Container, Row, Col} from "../components/Grid/index"
import loginAPI from "../utils/loginAPI"
import {Redirect} from "react-router-dom"

class Profile extends Component{

    state = {
        username: "",
        isAuthenicated: true

    }

    componentDidMount = () => {

        loginAPI.checkSession()
        .then((res)=> {
            if(!res.data){
                this.setState({isAuthenicated: false})
            }
            else{
                console.log(res.data)
                this.setState({username: res.data.username})
            }
        })
        .catch((err) => console.log(err))
    }



    render(){
        console.log(this.state.isAuthenicated)
        

        if(!this.state.isAuthenicated){
            return <Redirect to="/"/>
        }

        return(
            <Container>
                    <h1>Hello, {this.state.username}</h1>
            </Container>
            
        )
    }
}

export default Profile
