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
        validSuccess: {
          username:"",
          password:"",
          email:"",
          twitter_username:""
        },
        formErrors: {
          username: "",
          password: "",
          email: "",
          twitter_username:""
        }
    }

    componentWillMount = () => {

        // loginAPI.checkSession()
        // .then((res)=> {
        //     if(res.data){
        //         return this.setState({isAuthenticated: true})
        //     }
        // })
        // .catch((err) => console.log(err))
        if(this.props.user.logged) {
          this.setState({isAuthenticated: true})
        }

    }

    userHasAuthenticated = (username, authenticated) => {
        this.setState({
            username: username,
            isAuthenticated: authenticated });
      }

    onChangeHandler = (event) => {
        let {name, value} = event.target
        let formErrors = { ...this.state.formErrors };
        let validSuccess={ ...this.state.validSuccess};

        switch (name) {
          case "username":
            formErrors.username =
              value.length < 3 ? "minimum 3 characters required" : "";
            validSuccess.username =
              value.length >= 3 ? "username valid" : "";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characters required" : "";
              validSuccess.password =
                value.length >= 6 ? "password valid" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
            ? ""
            : "invalid email address";
            validSuccess.email = emailRegex.test(value)
              ? "email valid"
              : "";
          break;
          case "twitter_username":
            formErrors.twitter_username = twitterRegex.test(value)
            ? ""
            : "invalid twitter account";
            validSuccess.twitter_username = twitterRegex.test(value)
              ? "twitter valid"
              : "";
          break;
          default:
          break;
        }

        this.setState({formErrors, validSuccess, [name]: value}, () => console.log(this.state));
    };

    signUpHandler = (event) => {
        event.preventDefault()
// validation
        if (formValid(this.state)) {

          console.log(`
            --Submitting--
          Username: ${this.state.username}
          Password: ${this.state.password}
          Email: ${this.state.email}
          Twitter Username: ${this.state.twitter_username}
        `);
      } else {
        alert("FORM INVALID");
        console.log("FORM INVALID - display error message");
      }
// end form validation
        console.log(this.state);
        loginAPI.signup(this.state)
        .then((res)=> {
            console.log(res.data)
            if(res.status === 200){
                console.log("authenticating")
                this.props.doLogin(this.state.username);
                // this.userHasAuthenticated(res.data.username, true);
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }


    render(){
      const { formErrors, validSuccess } = this.state;

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
                        <Input
                          type="text"
                          className={formErrors.username.length > 0 ? ("error") : validSuccess.username.length>0?("form-control success"): ("form-control")}
                          // className = "form-control"
                          name = "username"
                          placeholder="username"
                          value = {this.state.username}
                          onChange = {this.onChangeHandler} >
                          </Input>
                          {formErrors.username.length > 0 && (
                            <span className="errorMessage">{formErrors.username}</span>
                          )}

                    </div>
                    <div className ="form-group">
                        <label htmlFor="password"> Password </label>
                        <Input
                        type="password"
                        className={formErrors.password.length > 0 ? "error" : validSuccess.password.length>0?("form-control success"): ("form-control")}
                        // className = "form-control"
                        name = "password"
                        placeholder="password"
                        value = {this.state.password}
                        onChange = {this.onChangeHandler}>
                        </Input>
                        {formErrors.password.length > 0 && (
                          <span className="errorMessage">{formErrors.password}</span>
                        )}
                    </div>
                    <div className ="form-group">
                        <label htmlFor="email"> Email </label>
                        <Input
                        type="email"
                        className={formErrors.email.length > 0 ? "error" : validSuccess.email.length>0?("form-control success"): ("form-control")}
                        // className = "form-control"
                        name = "email"
                        placeholder="example@mail.com"
                        value = {this.state.email}
                        onChange = {this.onChangeHandler}>
                        </Input>
                        {formErrors.email.length > 0 && (
                          <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    <div className ="form-group">
                        <label htmlFor="twitter_username"> Twitter Account </label>
                        <Input type="text"
                        className={formErrors.twitter_username.length > 0 ? "error" : validSuccess.twitter_username.length >0?("form-control success"): ("form-control")}
                        // className = "form-control"
                        name = "twitter_username"
                        placeholder="@twitteruser"
                        required value = {this.state.twitter_username}
                        onChange = {this.onChangeHandler}>
                        </Input>
                        {formErrors.twitter_username.length > 0 && (
                          <span className="errorMessage">{formErrors.twitter_username}</span>
                        )}
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
