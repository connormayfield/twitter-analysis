import React, {Component} from "react"
//import {Container} from "../components/Grid/index"
//import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginAPI from "../utils/loginAPI"
import {Wrapper, Container, LoginForm} from "../components/LoginComponent";
import {Link} from "react-router-dom"
import Sidebar from "../components/Sidebar";


class Login extends Component{

    state = {
        username: "",
        password: "",
        isAuthenticated: false
        
    }

    componentDidMount = () => {

        loginAPI.checkSession()
        .then((res)=> {
            if(res.data){
                return this.setState({isAuthenticated: true})
            }
        })
        .catch((err) => console.log(err))

    }


    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        
        this.setState({[name]: value})
    }


    loginHandler = (event) => {
        event.preventDefault()
        let loginObj = {
            username: this.state.username,
            password: this.state.password
        }
        loginAPI.login(loginObj)
        .then((res)=> {
            this.userHasAuthenticated(true);
        })
        .catch((err) => {
            alert("Wrong username/password")
            console.log("Wrong username/password")})
    }

    render(){


        if(this.state.isAuthenticated) {return <Redirect to="/profile"/>}

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
                        <Link className="createbtn" to="/signup">CREATE AN ACCOUNT</Link>
                        {/* <a className="createbtn" href="#">CREATE AN ACCOUNT</a> */}
                    </LoginForm>
                </Container>
            </Wrapper>
            
        )
    }

}


export default Login