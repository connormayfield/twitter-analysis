import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import loginApi from "../utils/loginAPI"
import loginAPI from "../utils/loginAPI";
class Login extends Component{

    state = {
        username: "",
        password: ""
    }

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        
        this.setState({[name]: value})
    }

    componentDidMount = () => {


        let obj = {
            username: "delta38",
            password: "root1234"
        }

        console.log(obj)

        loginAPI.login(obj)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }

    loginHandler = (event) => {
        event.preventDefault()
        loginApi.login(this.state)
    }

    render(){
        return(
            <Container >

                <h1>Login page</h1>  
                <form>
                    <div className ="form-group">
                        <label for="username"> Username</label>
                        <Input type="text" className = "form-control" name = "username" value = {this.state.username} onChange = {this.onChangeHandler} ></Input>
                    </div>
                    <div className ="form-group">
                        <label for="password"> Password </label>
                        <Input type="password" className = "form-control" name = "password" value = {this.state.password} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <FormBtn onClick = {this.loginHandler}>Submit</FormBtn>
                    
                </form>

            </Container>
            
        )
    }

}


export default Login