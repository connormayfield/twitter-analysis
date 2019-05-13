import React, {Component} from "react"
import {Wrapper, Container, SignupForm} from "../components/SignupComponent"
// import {Container} from "../components/Grid/index"
import {Input, FormBtn} from "../components/Form/index"
import {Redirect} from "react-router-dom"
import loginAPI from "../utils/loginAPI"
import Sidebar from "../components/Sidebar";
import zxcvbn from "zxcvbn";



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
        confirmPassword: "",
        email: "",
        twitter_username: "",
        isAuthenticated: false,
        suggestions:[],
        score:0,
        scoreMessage: "",
        passwordStatus:"",

        validSuccess: {
          username:"",
          password:"",
          confirmPassword: "",
          email:"",
          twitter_username:""
        },
        formErrors: {
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          twitter_username:""
        },
        scoreArray:[
          "Terrible",
          "Weak",
          "Poor",
          "Okay",
          "Great"
        ]


    };

// score === 0 ? "terrible" : "";
// score === 1 ? "weak" : "";
// score === 2 ? "poor" : "";
// score === 3 ? "okay" : "";
// score === 4 ? "great" : "";



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
        let validSuccess={ ...this.state.validSuccess};
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        const evaluation = zxcvbn(password)
        let scoreMessage = ""
        let passwordStatus=""



          // if score = 0

        switch (name) {
          case "username":
            formErrors.username =
              value.length < 3 ? "Minimum 3 characters required. " : "";
            validSuccess.username =
              value.length >= 3 ? "username valid" : "";
            break;
          case "password":
            // formErrors.password =
            //   value.length < 6 ? "Minimum 6 characters required. " : "";
            // validSuccess.password =
            //   value.length >= 6 ? "password valid" : "";

            scoreMessage = this.state.scoreArray[evaluation.score];
            if(scoreMessage==="Okay" || scoreMessage==="Great" ) {
              validSuccess.password = "password status : "+ scoreMessage+". Password valid"
              formErrors.password = "";
              passwordStatus="good";

            } else {
              scoreMessage = "password status : "+scoreMessage;
              formErrors.password = "you need more password character";
              validSuccess.password = "";
              passwordStatus="bad";

            }
            break;
            case "confirmPassword":
              formErrors.confirmPassword =
                confirmPassword.value !== password.value ? "Passwords must match. " : "";
              validSuccess.confirmPassword =
                confirmPassword.value === password.value ? "Password valid" : "";
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

        }


        this.setState({
          scoreMessage,
          formErrors,
          validSuccess,
          password,
          confirmPassword,
          passwordStatus,
          score:evaluation.score,
          suggestions:evaluation.feedback.suggestions,
          [name]: value},
          () => console.log(this.state));


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
                this.userHasAuthenticated(res.data.username, true);
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    render(){

    const { username, password,confirmPassword,email,twitter_username } = this.state.validSuccess;
    const isEnabled =
      username.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      email.length > 0 &&
      twitter_username.length > 0;

      const { formErrors, validSuccess, score, suggestions, scoreMessage,passwordStatus } = this.state;

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
                        id = "password"
                        className=
                        {
                        score === 0 ? ("scoreZero"):
                        score === 1 ? ("scoreOne"):
                        score === 2 ? ("scoreTwo"):
                        score === 3 ? ("scoreThree"):
                        score === 4 ? ("scoreFour"):
                        ("form-control")}

                        name = "password"
                        placeholder="password"
                        value = {this.state.password}
                        onChange = {this.onChangeHandler}
                        maxLength = "15">

                        </Input>
                        {formErrors.password.length > 0 && (
                          <span className="errorMessage">
                          <li>{scoreMessage}</li>
                          <li>{formErrors.password}</li>
                          <li>{suggestions[0]}</li>
                          <li>{suggestions[1]}</li>
                          <li>{suggestions[2]}</li>
                          </span>
                        )}
                        <li className="successMessage">{password}</li>

                    </div>
                    <div className ="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Input
                          type="password"
                          className={
                          this.state.confirmPassword !== this.state.password && this.state.password.length > 0 && this.state.confirmPassword > 0? ("error") :
                          this.state.password.length === 0 && this.state.confirmPassword.length > 0 ? ("error") :
                          this.state.confirmPassword === this.state.password && this.state.confirmPassword.length && passwordStatus ==="good" ?("success"):
                          ("form-control")}
                          name = "confirmPassword"
                          placeholder="password"
                          value = {this.state.confirmPassword}
                          onChange = {this.onChangeHandler}
                          maxLength = "15">
                          </Input>
                          {formErrors.confirmPassword.length > 0 && (
                            <span className="errorMessage">
                            <p>{formErrors.confirmPassword}</p>
                            </span>
                          )}
                    </div>
                    <div className ="form-group">
                        <label htmlFor="email"> Email </label>
                        <Input
                        type="email"
                        className={formErrors.email.length > 0 ? "error" : validSuccess.email.length>0?("success"): ("form-control")}
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
                        className={formErrors.twitter_username.length > 0 ? "error" : validSuccess.twitter_username.length >0?("form-control success"):  ("form-control")}
                        name = "twitter_username"
                        placeholder="@twitteruser"
                        required value = {this.state.twitter_username}
                        onChange = {this.onChangeHandler}>

                        </Input>
                        {formErrors.twitter_username.length > 0 && (
                          <span className="errorMessage">{formErrors.twitter_username}</span>
                        )}
                    </div>
                    <FormBtn onClick = {this.signUpHandler} disabled = {!isEnabled}>Submit</FormBtn>


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
//
