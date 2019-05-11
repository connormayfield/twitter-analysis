import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import "../Profile/style.css";
import Sidebar from "../../components/Sidebar"
import LineGraph from "../../components/Graphs/LineGraph"
import moment from 'moment';
import twitterAPI from "../../utils/twitterAPI"
import commentImg from "./img/comment.png"
import retweetImg from "./img/retweet.png"
import likeImg from "./img/heart.png"

const cardStyle = {
    marginTop: 5,
    marginLeft: 35,
    width: "20rem"
}

class Profile extends Component{

    state = {
        user: {},
        tweets:[],
        username: "",
        isAuthenicated: false,
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
                return;
            }
            else{
                twitterAPI.getTweets(res.data.username, 'asdf').then(res => {
                    console.log(res.data)
                    var user = {};
                    user.name = res.data[0].user.name;
                    user.screen_name = res.data[0].user.screen_name;
                    user.location = res.data[0].user.location;
                    user.description = res.data[0].user.description;
                    user.followers_count = res.data[0].user.followers_count;
                    user.friends_count = res.data[0].user.friends_count;
                    user.favourites_count = res.data[0].user.favourites_count;
                    user.profile_img = res.data[0].user.profile_image_url_https;
        
                    var newTweet = [];
                    for(var i = 0; i < res.data.length; i++){
                        const dateToFormat = res.data[i].created_at;
                        const formattedDate = moment(dateToFormat).format("MMM DD");

                        var oneTweet = {};
                        oneTweet.id = res.data[i].id;
                        oneTweet.created_at = formattedDate;
                        oneTweet.text = res.data[i].text;
                        oneTweet.retweets = res.data[i].retweet_count;
                        oneTweet.favorites = res.data[i].favorite_count;
                        oneTweet.name = res.data[i].user.name;
                        oneTweet.screen_name = res.data[i].user.screen_name;
                        oneTweet.user_id = res.data[i].user.id;

                        newTweet.push(oneTweet);
                        }
                        this.setState({username: res.data.username,
                            user:user,
                            tweets:[...newTweet],
                            isAuthenicated: true
                     });
                    })
                .catch(err => console.log(err))
            }
        });

    }



    connect = () => {
        window.open("http://127.0.0.1:3001/api/user/connect/twitter", "_self");
    }

    redirectTwitter = () => {
        window.open("https://twitter.com/"+this.state.user.screen_name, "_blank");
    } 


    render(){  
        return(
            <Container>
                <div className = "profileContainer">
                    <Row >
                            <Col size = "xs-3" >
                                <img className="profile-image" src={this.state.user.profile_img} alt="profile-pic"></img>
                            </Col>
                            <Col size = "xs-4">
                                <h5>{this.state.user.name}</h5>
                                {/* {this.state.user.twitter === undefined &&
                                    // <Link to="/api/user/connect/twitter">
                                        <button className="btn btn-primary" onClick={this.connect}>Connect Twitter</button>
                                    // </Link>
                                } */}
                                <h6>{this.state.user.screen_name}</h6>
                                <h6>{this.state.user.location}</h6>
                                <h6>{this.state.user.description}</h6>
                                <button className="btn btn-primary" onClick={this.redirectTwitter}>Twitter Home</button>
                            </Col>
                    </Row>
                </div>
                <div className="widgetContainer">
                        <h5>Here is your weekly analysis of your likes and followers:</h5>

                    <Row>
                        <div className="widget tweets">
                            <Col size="xs-4" >
                                <span>{this.state.user.friends_count}</span> Friends
                            </Col>
                        </div>
                        <div className="widget followers">
                            <Col size="xs-4">
                                <span>{this.state.user.followers_count}</span> Followers
                            </Col>
                        </div>
                        <div className="widget likes">
                            <Col size="xs-4">
                                <span>{this.state.user.favourites_count}</span> Favorites
                            </Col>
                        </div>
                    </Row>
                </div>
                <div className="graphContainer">
                    <h4>Weekly Tweet Data Example</h4>
                        <LineGraph id="linegraph"
                        labels={this.state.weekLabels}
                        graphData={this.state.weekData} 
                    />
                </div>
                <Row>
                    <Col size="xs-12">
                        {this.state.tweets.length === 0 ? (
                            <h1 className="text-center">No Tweets to Display</h1>
                        ) : (
                            <div>
                                {this.state.tweets.map((tweet, ind) => {
                                    return (
                                        <div className="card" style={cardStyle} key = {ind}>
                                            <div className="card-body">
                                                <h6 className="card-title">{tweet.name} - @{tweet.screen_name} - {tweet.created_at}</h6>
                                                <p className="card-text">{tweet.text}</p>
                                                <a href="#" className="card-link"><img src={commentImg}></img></a>
                                                <a href="#" className="card-link"><img src={retweetImg}></img> {tweet.retweets}</a>
                                                <a href="#" className="card-link"><img src={likeImg}></img> {tweet.favorites}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile;