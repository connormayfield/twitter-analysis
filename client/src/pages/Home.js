import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
import Switch from "react-switch";
import { Container, Row, Col } from "../components/Grid";
import Weekly from "../components/Weekly";
import Jumbotron from "../components/Jumbotron";
import loginAPI from "../utils/loginAPI";

class Home extends Component {

    state = {
        user: null,
        twitterAuth: false,
        auth: false
    }

    componentDidMount() {

        console.log(this.props.username);

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
					auth: true,
					user: user,
					twitterAuth: true
				})
			}
		})
	};

    onFailed = (error) => {
		alert(error);
    };

    disconnectTwitter = (checked) => {
        if (checked) {
            console.log("Disconnect Twitter");
        }
    }
    
    printState = () => {
        console.log(this.state);
    }

    render() {

        return (
        
            <div>
                <Jumbotron>
                    <Row>
                        <Col size="md-6 sm-12">

                        </Col>
                        <Col size="md-6 sm-12">
                            <Row textCenter>
                                <Col size="12">
                                    <h4 style={ {display: "inline-block", marginTop: -10} }>{this.state.twitterAuth ? "Twitter is Connected" : "Connect Twitter"}</h4>
                                    <TwitterLogin
                                        loginUrl="http://localhost:3001/api/auth/twitter"
                                        onFailure={this.onFailed} onSuccess={this.onSuccess}
                                        requestTokenUrl="http://localhost:3001/api/auth/twitter/reverse"
                                        credentials="include"
                                        tag="span"
                                        text=""
                                        disabled={this.state.twitterAuth}
                                        showIcon={false}
                                        style={ {height: 28, width: 56, marginTop: -8} }
                                    > 
                                        <Switch checked={this.state.twitterAuth} onChange={this.disconnectTwitter}/>
                                    </TwitterLogin>
                                </Col>
                                <Col size="12">
                                    {/* <Switch disabled={true} /> */}
                                </Col>
                                <Col size="12">
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="md-6 sm-12">
                            <Weekly />
                        </Col>
                        <Col size="md-6 sm-12">
                        </Col>
                    </Row>
                    {!!this.state.twitterAuth ?
                        (
                            <div>
                                <h1>Twitter connected!</h1>
                            </div>
                        ) :
                        (
                            <div>
                                <div>

                                </div>
                            </div>
                        )}
                        <button className="btn btn-primary" onClick={this.printState}>State</button>
                </Container>
            </div>
        )

	}

}

export default Home;