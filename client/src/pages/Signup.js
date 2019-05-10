import React, {Component} from "react"
import {Wrapper, Container, SignupForm} from "../components/SignupComponent"
// import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginAPI from "../utils/loginAPI"
import Sidebar from "../components/Sidebar";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const twitterRegex = RegExp(/^@[A-Za-z0-9_]{1,15}$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

// validate form errors being empty

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
Object.values(rest).forEach(val => {
  val === null && (valid = false);
});

  return valid;
};

class SignUp extends Component{

    state = {
        username: "",
        password: "",
        email: "",
        twitter_username: "",
        isAuthenticated: false,
        formErrors: {
          username: "",
          password: "",
          email: "",
          twitter_username:""
        }
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

    userHasAuthenticated = (username, authenticated) => {
        this.setState({
            username: username,
            isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        let formErrors = { ...this.state.formErrors };

        switch (name) {
          case "username":
            formErrors.username =
              value.length < 3 ? "minimum 3 characters required" : "";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
            ? ""
            : "invalid email address";
          break;
          case "twitter_username":
            formErrors.twitter_username = twitterRegex.test(value)
            ? ""
            : "invalid twitter account";
          break;
          default:
          break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    signUpHandler = (event) => {
        event.preventDefault()
// validation
        if (formValid(this.state)) {
          // this.state.isAuthenticated=true;
          console.log(`
          Username: ${this.state.username}
          Password: ${this.state.password}
          Email: ${this.state.email}
          Twitter Username: ${this.state.twitter_username}
        `);
      } else {
        console.log("FORM INVALID - display error message");
      }
// end form validation
        console.log("connor");
        console.log(this.state);
        loginAPI.signup(this.state)
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
      const { formErrors } = this.state;

        if(this.state.isAuthenticated) {return <Redirect to="/profile"/>}

        return(

          <Wrapper >       
             <Sidebar/>
            <Container >
              <SignupForm >
                <h1>Sign Up</h1>
                <form>
                    <div className ="form-group">
                        <label htmlFor="username"> Username</label>
                        <Input type="text" className = "form-control" name = "username" placeholder="username" value = {this.state.username} onChange = {this.onChangeHandler} ></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlFor="password"> Password </label>
                        <Input type="password" className = "form-control" name = "password" placeholder="password" value = {this.state.password} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <div className ="form-group">
                        <label htmlFor="email"> Email </label>
                        <Input type="email" className = "form-control" name = "email" placeholder="example@mail.com" value = {this.state.email} onChange = {this.onChangeHandler}></Input>
                    </div>
                    <FormBtn onClick = {this.signUpHandler}>Submit</FormBtn>



                </form>
                </SignupForm>
              </Container>
            </Wrapper>
        )
    }

}


export default SignUp


// <form>
//   <h2>Twitter Username Validation</h2>
//   <label for="twitter">Twitter username with the leading @ symbol:</label><br/>
//   <input id="twitter" type="text" pattern="^@[A-Za-z0-9_]{1,15}$" required>
//   <input type="submit" value="Submit">
//
//   <p class="p">Demo by Agbonghama Collins. <a href="http://www.sitepoint.com/client-side-form-validation-html5/">See article</a>.</p>
// </form>
