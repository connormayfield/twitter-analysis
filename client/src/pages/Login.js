import React, {Component} from "react"
import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginApi from "../utils/loginAPI"
class Login extends Component{

    state = {
        username: "",
        password: "",
        isAuthenticated: false
    }

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        
        this.setState({[name]: value})
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

    loginHandler = (event) => {
        event.preventDefault()
        let loginObj = {
            username: this.state.username,
            password: this.state.password
        }
        loginApi.login(loginObj)
        .then((res)=> {

            console.log(res.status)
            console.log(res.data)
            
            this.userHasAuthenticated(true);
        })
        .catch((err) => console.log("Wrong username/password"))
    }

    render(){

        console.log(this.state)

        if(this.state.isAuthenticated) {return <Redirect to="/profile"/>}

        return(
            <Container >

                <h1>Login page</h1>  
                <form>
                    <div className ="form-group">
                        <label htmlfor="username"> Username</label>
                        <Input type="text" className = "form-control" name = "username" value = {this.state.username} onChange = {this.onChangeHandler} ></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlfor="password"> Password </label>
                        <Input type="password" className = "form-control" name = "password" value = {this.state.password} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <FormBtn onClick = {this.loginHandler}>Submit</FormBtn>
                    
                </form>

            </Container>
            
        )
    }

}


export default Login