import React from 'react';
import './App.css';
import {Router, Route, Switch} from "react-router-dom"
import Navbar from "./components/navbar/index.js"
import Login from "./pages/Login"
import Profile from "./pages/Profile/Profile"
import Error from "./pages/Error"
import Progress from "./pages/Progress";
import SignUp from './pages/Signup';
import Wrapper from "./components/Wrapper";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { connect } from "react-redux";
import { doLogin, doLogout, doTwitterConnect } from "./redux/actions/userActions";
import history from "./redux/history";
import PrivateRoute from "./redux/component/PrivateRoute";
import PrivateRoute2 from "./redux/component/PrivateRoute2";




const App = ({user, doLogin, doLogout}) => (

  <Router history={history}>
      <div id="page-container">
        <Navbar user= {user} doLogin={doLogin} doLogout={doLogout}/>
        <Wrapper>
        <Sidebar user={user} doLogin={doLogin} doLogout={doLogout}/>
          <Switch>
            
            <PrivateRoute exact path="/" component={Login} user={user} doLogin={doLogin} />
            <PrivateRoute2 path="/profile" component={Profile} user={user}/>
            <PrivateRoute2 path="/home" component={Home} user={user}/>
            <PrivateRoute path="/signup" component={SignUp} user={user} doLogin={doLogin}/>
            <PrivateRoute2 path="/inprogress"component ={Progress} user={user}/>
            <Route component ={Error}/>
            
            
          </Switch>
        </Wrapper>
      </div>
  </Router>
)

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { doLogin, doLogout, doTwitterConnect },
)(App);