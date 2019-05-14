import React, {Component} from "react"
import {Wrapper, Container, SignupForm} from "../components/SignupComponent"
import {Link} from "react-router-dom"
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
        ],
        progressBarArray:[
         "bg-danger",
         "bg-warning",
         "bg-info",
         "bg-success"
       ],
       progressState:"",
       progressNumber:""


    };

// score === 0 ? "terrible" : "";
// score === 1 ? "weak" : "";
// score === 2 ? "poor" : "";
// score === 3 ? "okay" : "";
// score === 4 ? "great" : "";



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
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        const evaluation = zxcvbn(password)
        let scoreMessage = ""
        let passwordStatus=""
        let progressState=""
        let progressBarArray=this.state.progressBarArray;
        let progressNumber=""



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
            // if(scoreMessage==="Okay" || scoreMessage==="Great" ) {
            //   validSuccess.password = "password status : "+ scoreMessage+". Password valid"
            //   formErrors.password = "";
            //   passwordStatus="good";
            //
            // } else {
            //   scoreMessage = "password status : "+scoreMessage;
            //   formErrors.password = "you need more password character";
            //   validSuccess.password = "";
            //   passwordStatus="bad";
            //
            // }
            if(scoreMessage==="Great") {
              progressState=progressBarArray[3];
              progressNumber="100%"
              passwordStatus="good";
              validSuccess.password = "Password Strength : "+ scoreMessage
              formErrors.password = "";
            } else if(scoreMessage==="Okay") {
              progressState=progressBarArray[2];
              progressNumber="75%"
              passwordStatus="good";
              validSuccess.password = "Password Strength : "+ scoreMessage
              formErrors.password = "";
            } else if(scoreMessage==="Poor") {
              progressState=progressBarArray[1];
              progressNumber="50%"
              passwordStatus="bad";
              validSuccess.password = "";
              formErrors.password = "Password Strength : "+ scoreMessage;
            } else if(scoreMessage==="Weak") {
              progressState=progressBarArray[0];
              progressNumber="25%"
              passwordStatus="bad";
              validSuccess.password = "";
              formErrors.password = "Password Strength : "+ scoreMessage;
            } else {
              progressState=progressBarArray[0];
              progressNumber="0%"
              passwordStatus="bad";
              validSuccess.password = "";
              formErrors.password = "Password Strength : "+ scoreMessage;
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
          progressState,
          passwordStatus,
          progressNumber,
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
                this.props.doLogin(this.state.username);
                // this.userHasAuthenticated(res.data.username, true);
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
      this.state.password === this.state.confirmPassword;

      const { formErrors, validSuccess, score, suggestions, scoreMessage,passwordStatus } = this.state;

        if(this.state.isAuthenticated) {return <Redirect to="/profile"/>}

        return(

          <Wrapper >
          <Sidebar/>
            <Container >
              <SignupForm >
                <h1>Sign Up</h1>
                <Link className="createbtn" to="/">or Login</Link>
                <form>
                    <div className ="form-group">
                        {/* <label htmlFor="username"> Username</label> */}
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
                        {/* <label htmlFor="password"> Password </label> */}
                        <Input
                        type="password"
                        id = "signuppassword"
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
                        <div className="progress" id="progress">
  <div className={`progress-bar ${this.state.progressState}`} id="progress-bar" role="progressbar" style={{"width": this.state.progressNumber}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
{ passwordStatus==="good"? password : formErrors.password}



                    </div>
                    <div className ="form-group">
                        {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                        <Input
                          type="password"
                          className={
                          this.state.confirmPassword !== this.state.password && this.state.password.length > 0 && this.state.confirmPassword > 0? ("error") :
                          this.state.password.length === 0 && this.state.confirmPassword.length > 0 ? ("error") :
                          this.state.confirmPassword === this.state.password && this.state.confirmPassword.length && passwordStatus ==="good" ? ("success"):
                          ("form-control")}
                          name = "confirmPassword"
                          placeholder="confirm password"
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
                    <FormBtn onClick = {this.signUpHandler} disabled = {!isEnabled}>Sign Up</FormBtn>
                    
                </form>
                </SignupForm>
              </Container>
            </Wrapper>
        )
    }
}


export default SignUp

