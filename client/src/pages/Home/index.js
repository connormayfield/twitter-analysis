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

        // console.log(this.props.username);

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
				// console.log(user);
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
            // console.log("Disconnect Twitter");
        }
    }

    render() {

        return (
        
            <div className="connectionPage">
                <div className="our-purpose">
                    <h3 className="logo"><br></br>Welcome to TweetTrace</h3>
                    <h6 className="whatWeDo"><br></br><br></br>Our goal is to make growing your social media presence and reach by making your profile's stats easy to read and track on a weekly basis.
                        <br></br><br></br>With TweetTrace, you can consolidate your social media accounts and watch the impact of your posts. 
                        <br></br><br></br>Check your Weekly Insight graph to see trends in your likes and retweets.
                        <br></br><br></br>Access your most recent feeds and get a sense of how people are responding based on an analysis of comments and mentions.
                        <br></br><br></br><br></br>Get started by connecting to your accounts below!
                        
                    </h6>
                    <hr></hr>
                </div>
                    <Container>
                        <Row>
                            <Col size="md-6 sm-12">
                                <Row>
                                    <Col size="12" classes="connections">
                                        <h4 className="connect-text">Manage Account Connections</h4>
                                    </Col>
                                    <Col size="12" classes="connections">
                                        <Row>
                                            <Col size="2" ><i className="fab fa-twitter bird2 social-icon"></i></Col>
                                            <Col size="6">
                                                <h6 className="align-middle connect-text">{this.state.twitterAuth ? "Twitter Connected" : "Connect Twitter"}</h6>
                                            </Col>
                                            <Col size="2">
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
                                            <Col size="2" ><i className="fab fa-instagram  social-icon"></i></Col>
                                            <Col size="6">
                                                <h6 className="align-middle connect-text">Connect Instagram</h6>
                                            </Col>
                                            <Col size="2">
                                                <Switch disabled={true} checked={false} onChange={() => {}}/>                                            
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size="12" classes="connections">
                                        <Row>
                                            <Col size="2" ><i className="fab fa-facebook-square  social-icon"></i></Col>
                                            <Col size="6">
                                                <h6 className="align-middle connect-text">Connect Facebook</h6>
                                            </Col>
                                            <Col size="2">
                                                <Switch disabled={true} checked={false} onChange={() => {}}/>                                            
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <hr></hr>
                <Container>
                    <Row>
                        <Col size="12" classes="graph-text">
                            <h4><br></br>Graph Examples</h4>
                            <h6>Using TweetTrace, you can dynamically track likes, retweets and comments.</h6>
                            <h6>Get an idea of what people think of your posts, using our sentiment graphs.</h6>
                        </Col>
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