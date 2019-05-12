import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
import { Container, Row, Col } from "../components/Grid";
import loginAPI from "../utils/loginAPI";

class Connections extends Component {

    state = {
        user: null,
        twitterAuth: false,
        auth: false
    }

    componentDidMount() {

        loginAPI.checkSession()
            .then(res => {
                if(res.data){

                    const user = res.data;
                    const twitterAuth = user.twitter ? true : false;

                    this.setState({ user, twitterAuth, auth: true });
                }
            }).catch(err => console.log(err));
    }

    onSuccess = (response) => {

		const token = response.headers.get("x-auth-token");
		response.json().then(user => {
			if (token) {
				console.log(user);
				this.setState({
					isAuthenticated: true,
					user: user,
					token: token
				})
			}
		})
	};

    onFailed = (error) => {
		alert(error);
    };

    printState = () => console.log(this.state)
    
    render() {
		
        return (
        
            <Container>
                {!!this.state.twitterAuth ?
                    (
                        <div>
                            <h1>Twitter connected!</h1>
                        </div>
                    ) :
                    (
                        <div>
                            <div>
                                Welcome {this.state.auth && this.state.user.username}!
                            </div>
                            <div>
                                <TwitterLogin
                                    loginUrl="http://localhost:3001/api/auth/twitter"
                                    onFailure={this.onFailed} onSuccess={this.onSuccess}
                                    requestTokenUrl="http://localhost:3001/api/auth/twitter/reverse"
                                    credentials="include"
                                />
                            </div>
                        </div>
                    )}
                    <button className="btn btn-primary" onClick={this.printState}>State</button>
            </Container>
        )

	}

}

export default Connections;