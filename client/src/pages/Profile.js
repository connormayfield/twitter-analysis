import React, {Component} from "react"
import {Container, Row, Col} from "../components/Grid/index"
import loginApi from "../utils/loginAPI"
import {Redirect} from "react-router-dom"

class Profile extends Component{

    state = {
        username: "",
        isAuthenicated: true

    }

    componentDidMount = () => {

        loginApi.checkSession()
        .then((res)=> {
            console.log(res.data)
            if(!res.data){
                this.setState({isAuthenicated: false})
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
                    <h1>Hello, abcd</h1>
            </Container>
            
        )
    }
}

export default Profile
