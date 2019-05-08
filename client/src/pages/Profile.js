import React, {Component} from "react"
import {Container, Row, Col} from "../components/Grid/index"
import loginAPI from "../utils/loginAPI"
import sentimentAPI from "../utils/sentimentAPI"
import {Redirect} from "react-router-dom"

class Profile extends Component{

    state = {
        username: "",
        isAuthenicated: true,
        emotionScore: {}

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
            return <Redirect to="/login"/>
        }

        return(
            <Container>
                    <h1>Hello, {this.state.username}</h1>
                    <h5>Data goes here</h5>
                    <button>emotionScore</button>
                    
            </Container>
            
        )
    }
}

export default Profile
