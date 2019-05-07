import React, {Component} from "react"
//import {Container} from "../components/Grid/index"
//import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginApi from "../utils/loginAPI"
import {Wrapper, Container, LoginForm} from "../components/LoginComponent";
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


        // let obj = {
        //     username: "delta38",
        //     password: "root1234"
        // }

        // loginAPI.login(obj)
        // .then((res)=> console.log(res))
        // .catch((err) => console.log("err"))
    }

    loginHandler = (event) => {
        event.preventDefault()
        let loginObj = {
            username: this.state.username,
            password: this.state.password
        }
        loginApi.login(loginObj)
        .then((res)=> {
            this.userHasAuthenticated(true);
        })
        .catch((err) => console.log("Wrong username/password"))
    }

    render(){

        console.log(this.state)

        let authenticated = this.state.isAuthenticated;

        if(authenticated) {return <Redirect to="/profile"/>}


        return(
            <Wrapper>
                <Container>
                    <LoginForm>
                        <h1>LOG IN</h1>
            
                        <form onSubmit={this.loginHandler}>
                        <div className="inputbox">
                            <input type="text" name="username" placeholder="@username" value={this.state.username} onChange={this.onChangeHandler}/>
                        </div>
            
                        <div className="inputbox">
                            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChangeHandler}/>
                        </div>
            
                        <input className="loginbtn" type="submit" name="" value="LOG IN" />
            
                        </form>
                        {/* <a className="passbtn" href="#">FORGOT PASSWORD?</a> */}
                        <a className="createbtn" href="#">CREATE AN ACCOUNT</a>
                    </LoginForm>
                </Container>
            </Wrapper>
            
        )
    }

}


export default Login