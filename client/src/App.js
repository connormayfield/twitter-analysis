import React, {Component} from 'react';
//import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar/index.js"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile/Profile"
import Error from "./pages/Error"
import SignUp from './pages/Signup';
import Weekly from "./pages/Weekly";
import Wrapper from "./components/Wrapper";
// import Sidebar from "./components/Sidebar";

class App extends Component {


  render(){
  
    return (
      <Router>
        <div>
          <Navbar/>
          {/* <Sidebar /> */}
          <Wrapper>
            <Switch>
              <Route exact path="/" component ={Home}/>
              <Route exact path="/login" component ={Login}/>
              <Route  path = "/profile" component = {Profile}/>
              <Route exact path ="/signup" component = {SignUp}/>
              <Route exact path="/weekly" component = {Weekly} />
              <Route  component ={Error}/>
            </Switch>
          </Wrapper>
            </div>
        </Router>
    );
  }
}
export default App;

