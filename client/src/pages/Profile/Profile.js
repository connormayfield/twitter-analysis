import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import "../Profile/style.css";
import Sidebar from "../../components/Sidebar"
import LineGraph from "../../components/Graphs/LineGraph"

class Profile extends Component{

    state = {
        user: {},
        weekLabels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        weekData: [
            {
                label: "Likes",
                backgroundColor: "#CC000044",
                primaryColor: "#CC0000",
                data: [1, 2, 100, 4, 5, 6, 200]                
            },
            {
                label: "Retweets",
                backgroundColor: "#00FF0044",
                primaryColor: "#00FF00",
                data: [400, 6, 200, 4, 3, 2, 1]
            }

        ]

    }

    componentDidMount = () => {

        loginAPI.checkSession()
        .then((res)=> {
            if(!res.data){
                this.setState({isAuthenicated: false})
            }
            else{
                this.setState({user: res.data})
                console.log(this.state.user);
            }
        })
        .catch((err) => console.log(err))

        // var screen_name = res.tweets[0].user.screen_name;
        // var location = res.tweets[0].user.location;
        // var description = res.tweets[0].user.description;
        // var url = res.tweets[0].user.url;
        // var followers_count = res.tweets[0].user.followers_count;
        // var friends_count = res.tweets[0].user.friends_count;
        // var favourites_count = res.tweets[0].user.favourites_count;
        // var profile_img = res.tweets[0].user.profile_img;
    }

    connect = () => {
        loginAPI.twitterConnect()
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
    }

    render(){  

        return(
            <Container> 
                <div className = "profileContainer">
                    <Row >
                            <Col size = "xs-3" >
                                <img src="https://via.placeholder.com/100" alt="profile-pic"></img>
                            </Col>
                            <Col size = "xs-4">
                                <h5>Welcome back, {this.state.user.username}</h5>
                                {this.state.user.twitter === undefined &&
                                    // <Link to="/api/user/connect/twitter">
                                        <a href="/api/user/connect/twitter" className="btn btn-primary" /*onClick={this.connect}*/>Connect Twitter</a>
                                    // </Link>
                                }
                            </Col>
                    </Row>
                </div>
                <div className="graphContainer">
                    <h4>Weekly Tweet Data Example</h4>
                        <LineGraph id="linegraph"
                        labels={this.state.weekLabels}
                        graphData={this.state.weekData} 
                    />
                </div>
                <div className="widgetContainer">
                        <h5>Here is your weekly analysis of your likes and followers:</h5>

                    <Row>
                        <div className="widget tweets">
                            <Col size="xs-4" >
                                <span>XX</span> Retweets
                            </Col>
                        </div>
                        <div className="widget followers">
                            <Col size="xs-4">
                                <span>XX</span> Followers
                            </Col>
                        </div>         
                        <div className="widget likes">
                            <Col size="xs-4">
                                <span>XX</span> Favorites
                            </Col>
                        </div>          
                    </Row>
                </div>
            </Container>
        )
    }
}

export default Profile
