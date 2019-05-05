import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar/index.js"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Error from "./pages/Error"

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
              <Switch>
              <Route exact path="/" component ={Home}/>
              <Route exact path="/login" component ={Login}/>
              <Route  component ={Error}/>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
