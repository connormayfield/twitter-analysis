import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar/index.js"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Error from "./pages/Error"
import SignUp from './pages/Signup';

class App extends Component {


  render(){
  
  return (<div className="App">
      <Router>
      <div>
              <Navbar/>
              <Switch>
              <Route exact path="/" component ={Home}/>
              <Route exact path="/login" component ={Login}/>
              <Route exact path = "/profile" component = {Profile}/>
              <Route exact path ="/signup" component = {SignUp}/>
              <Route  component ={Error}/>
          </Switch>
          </div>
      </Router>
    </div>
  );




}
}
export default App;
