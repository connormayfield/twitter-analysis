import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginApi from "../utils/loginAPI"

class SignUp extends Component{

    state = {
        username: "",
        password: "",
        email: "",
        twitter_username: "",
        isAuthenticated: false
    }

    componentDidMount = () => {

        loginApi.checkSession()
        .then((res)=> {
            if(res.data){
                return this.setState({isAuthenticated: true})
            }
        })
        .catch((err) => console.log(err))

    }

    userHasAuthenticated = (username, authenticated) => {
        this.setState({ 
            username: username,
            isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        
        this.setState({[name]: value})
    }

    signUpHandler = (event) => {
        event.preventDefault()
        loginApi.signup(this.state)
        .then((res)=> {
            console.log(res.data)
            if(res.status === 200){
                console.log("authenticatgin")
                this.userHasAuthenticated(res.data.username, true);
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    render(){

        if(this.state.isAuthenticated) {return <Redirect to="/profile"/>}

        return(
            <Container >

                <h1>Sign Up page</h1>  
                <form>
                    <div className ="form-group">
                        <label htmlfor="username"> Username</label>
                        <Input type="text" className = "form-control" name = "username" value = {this.state.username} onChange = {this.onChangeHandler} ></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlfor="password"> Password </label>
                        <Input type="password" className = "form-control" name = "password" value = {this.state.password} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlfor="email"> Email </label>
                        <Input type="email" className = "form-control" name = "email" value = {this.state.email} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlfor="twitter_username"> Twitter Account </label>
                        <Input type="text" className = "form-control" name = "twitter_username" value = {this.state.twitter_username} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <FormBtn onClick = {this.signUpHandler}>Submit</FormBtn>
                    
                </form>

            </Container>
            
        )
    }

}


export default SignUp