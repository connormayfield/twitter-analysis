import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import loginApi from "../utils/loginAPI"

class SignUp extends Component{

    state = {
        username: "",
        password: "",
        twitter_username: "",
    }

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        
        this.setState({[name]: value})
    }

    signUpHandler = (event) => {
        event.preventDefault()
        loginApi.signup(this.state)
        console.log("work")
    }

    render(){
        return(
            <Container >

                <h1>Sign Up page</h1>  
                <form>
                    <div className ="form-group">
                        <label for="username"> Username</label>
                        <Input type="text" className = "form-control" name = "username" value = {this.state.username} onChange = {this.onChangeHandler} ></Input>
                    </div>
                    <div className ="form-group">
                        <label for="password"> Password </label>
                        <Input type="password" className = "form-control" name = "password" value = {this.state.password} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <div className ="form-group">
                        <label for="twitter_username"> Twitter Account </label>
                        <Input type="text" className = "form-control" name = "twitter_username" value = {this.state.twitter_username} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <FormBtn onClick = {this.signUpHandler}>Submit</FormBtn>
                    
                </form>

            </Container>
            
        )
    }

}


export default SignUp