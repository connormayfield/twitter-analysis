import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar/index.js"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Error from "./pages/Error"
import SignUp from './pages/Signup';

class App extends Component {
  state = {

      isAuthenticated: false
    
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  render(){

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
  return (
    <div className="App">
      <Router>
          <Navbar/>
              <Switch>
              <Route exact path="/" component ={Home}/>
              <Route exact path="/login" component ={Login}/>
              <Route exact path ="/signup" component = {SignUp}/>
              <Route  component ={Error}/>

          </Switch>
      </Router>
    </div>
  );




}
}
export default App;
