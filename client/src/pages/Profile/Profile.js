import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import "../Profile/style.css";
import "../../components/TweetCard/index"
import LineGraph from "../../components/Graphs/LineGraph"
import moment from 'moment';
import twitterAPI from "../../utils/twitterAPI"
import TweetCard from "../../components/TweetCard/index";


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
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: "Retweets",
                backgroundColor: "#00FF0044",
                primaryColor: "#00FF00",
                data: [0, 0, 0, 0, 0, 0, 0]
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
                twitterAPI.getTweets(res.data.username, 'JebBush').then(({data}) => {
                    //Gathering user information
                    console.log(data)


                    let weekData = [...this.state.weekData];
                    
                    for(let i = 0; i < data.weeklyData.length; i++){
                        if(data.weeklyData[i] !== null){
                            weekData[0].data[i] = data.weeklyData[i].favorites
                            weekData[1].data[i] = data.weeklyData[i].retweets
                        }
                    }
                        this.setState({username: res.data.username,
                            user: data.user,
                            tweets: data.newTweets,
                            isAuthenicated: true,
                            weekData: weekData
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

    showModal = ()=>{

    }

    hideModal = () => {
        
    }


    render(){  
        console.log(this.state.weekData)
        return(
            <Container>
                <div className = "profileContainer">
                    <Row >
                        <Col size = "xs-3" >
                            <img className="profile-image" src={this.state.user.profile_image_url_https} alt="profile-pic"></img>
                        </Col>
                        <Col size = "xs-4">
                            <h5>{this.state.user.name}</h5>
                            <h6>{this.state.user.screen_name}</h6>
                            <h6>{this.state.user.location}</h6>
                            <h6>{this.state.user.description}</h6>
                        </Col>
                    </Row>
                </div>
                <div className="widgetContainer">
                    <Row>
                        <div className="widget statuses">
                            <Col size="xs-4" >
                                <span>Tweets</span>
                                <br></br>
                                <span>{this.state.user.statuses_count}0</span>
                            </Col>
                        </div>
                        <div className="widget tweets">
                            <Col size="xs-4" >
                                <span>Friends</span>
                                <br></br>
                                <span>{this.state.user.friends_count}0</span>
                            </Col>
                        </div>
                        <div className="widget followers">
                            <Col size="xs-4">
                                <span>Followers</span>
                                <br></br>
                                <span>{this.state.user.followers_count}0</span>
                            </Col>
                        </div>
                        <div className="widget likes">
                            <Col size="xs-4">
                                <span>Likes</span>
                                <br></br>
                                <span>{this.state.user.favourites_count}0</span>
                            </Col>
                        </div>
                    </Row>
                </div>
                <div className="graphContainer">
                    <h4>Weekly Tweet Data Example</h4>
                    <div className="graph">
                        <LineGraph id="linegraph"
                        labels={this.state.weekLabels}
                        graphData={this.state.weekData}/>
                    </div>
                </div>
                <Row>
                    <Col size="xs-12">
                        {this.state.tweets.length === 0 ? (
                            <h4 className="noTweets text-center">No Tweets to Display</h4>
                        ) : (
                            <div className="container-fluid twitterFeed">
                            <h3>Your Most Recent Twitter Feed</h3>
                                <div className="d-flex flex-row flex-wrap">
                                    {this.state.tweets.map((tweet) => {
                                        return (
                                            <TweetCard
                                            key = {tweet.id}
                                            name = {tweet.name}
                                            screen_name = {tweet.screen_name}
                                            created_at = {tweet.created_at}
                                            text = {tweet.text}
                                            retweets = {tweet.retweets}
                                            favorites = {tweet.favorites}
                                            />
                                        );
                                    })}
                                </div>
                            </div>    
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Profile;