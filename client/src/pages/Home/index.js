import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
import Switch from "react-switch";
import { Container, Row, Col } from "../../components/Grid";
import Weekly from "../../components/Weekly";
import Jumbotron from "../../components/Jumbotron";
import loginAPI from "../../utils/loginAPI";
import "./style.css";

class Home extends Component {

    state = {
        user: null,
        twitterAuth: false,
        auth: false,

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
        console.log(checked);
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
                    <Container>
                        <Row>
                            <Col size="md-6 sm-12">
                                <h1>Tweet Trace</h1>
                            </Col>
                            <Col size="md-6 sm-12">
                                <Row>
                                    <Col size="12" classes="connections">
                                        <Row>
                                            <Col size="1" />
                                            <Col size="8">
                                                <h4 className="align-middle">{this.state.twitterAuth ? "Twitter is Connected" : "Connect Twitter"}</h4>
                                            </Col>
                                            <Col size="3">
                                                <TwitterLogin
                                                    loginUrl="/api/auth/twitter"
                                                    onFailure={this.onFailed} onSuccess={this.onSuccess}
                                                    requestTokenUrl="/api/auth/twitter/reverse"
                                                    credentials="include"
                                                    text=""
                                                    className="twitter-login"
                                                    disabled={this.state.twitterAuth}
                                                    showIcon={false}
                                                    style={ {display: "none"} }
                                                /> 
                                                <span id="twitter-login-switch">
                                                    <Switch checked={this.state.twitterAuth} onChange={() => this.disconnectTwitter(this.state.twitterAuth)}/>
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size="12" classes="connections">
                                        <Row>
                                            <Col size="1" />
                                            <Col size="8">
                                                <h4 className="align-middle">Connect Instagram</h4>
                                            </Col>
                                            <Col size="3">
                                                <Switch disabled={true} checked={false} onChange={() => {}}/>                                            
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size="12" classes="connections">
                                        <Row>
                                            <Col size="1" />
                                            <Col size="8">
                                                <h4 className="align-middle">Connect Facebook</h4>
                                            </Col>
                                            <Col size="3">
                                                <Switch disabled={true} checked={false} onChange={() => {}}/>                                            
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="md-6 sm-12">
                            <Weekly />
                        </Col>
                        <Col size="md-6 sm-12">
                        </Col>
                    </Row>
                </Container>
            </div>
        )

	}

}

export default Home;