import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import "../Profile/style.css";
import "../../components/TweetCard/index"
import LineGraph from "../../components/Graphs/LineGraph"
import moment from 'moment';
import twitterAPI from "../../utils/twitterAPI"
import TweetCard from "../../components/TweetCard/index";
// import commentImg from "./img/comment.png"
// import retweetImg from "./img/retweet.png"
// import likeImg from "./img/heart.png"



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
                    let user = data[0].user
        
                    var newTweets = [];

                    for(var i = 0; i < data.length; i++){
                        var oneTweet = {};
                        oneTweet.id = data[i].id;
                        oneTweet.created_at = moment(data[i].created_at).format("MMM DD YYYY");
                        oneTweet.text = data[i].text;
                        oneTweet.retweets = data[i].retweet_count;
                        oneTweet.favorites = data[i].favorite_count;
                        oneTweet.name = data[i].user.name;
                        oneTweet.screen_name = data[i].user.screen_name;
                        oneTweet.user_id = data[i].user.id;
                        newTweets.push(oneTweet);
                        }

                        this.setState({username: data.username,
                            user:user,
                            tweets: newTweets,
                            isAuthenicated: true
                     });
                     this.updateWeeklyGraph()
                    //  this.setState({weekInterval: setInterval(this.updateWeeklyGraph, 10000)})
                    })

                .catch(err => console.log(err))
            }
        });
    }

    updateWeeklyGraph = () => {
        twitterAPI.getTweets(this.state.username, 'JebBush').then(({data}) => {
            //Gathering user information
            var newTweets = [];

            for(var i = 0; i < data.length; i++){
                var oneTweet = {};
                oneTweet.created_at = moment(data[i].created_at).format("MMM DD YYYY");
                oneTweet.retweets = data[i].retweet_count;
                oneTweet.favorites = data[i].favorite_count;
                newTweets.push(oneTweet);
                }

                let graphData = new Array(7);
                    
                newTweets.forEach(tweet => {

                    //Gathering "retweet" data and "favorites" data
                    let day = moment(tweet.created_at).format("dddd");
                    switch (day){
                        case("Sunday"):
                            if (graphData[0] === undefined){
                              graphData[0] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[0].favorites += tweet.favorites;
                                graphData[0].retweets  += tweet.retweets;
                            }
                            break;

                            case("Monday"):
                            if (graphData[1] === undefined){
                              graphData[1] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[1].favorites += tweet.favorites;
                                graphData[1].retweets += tweet.retweets;
                            }
                            break;

                            case("Tuesday"):
                            if (graphData[2] === undefined){
                              graphData[2] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[2].favorites += tweet.favorites;
                                graphData[2].retweets += tweet.retweets;
                            }
                            break;

                            case("Wednesday"):
                            if (graphData[3] === undefined){
                              graphData[3] = {favorites: tweet.favorites, retweets: tweet.retweets}
                            }else {
                                graphData[3].favorites += tweet.favorites;
                                graphData[3].retweets += tweet.retweets;
                            }
                            break;

                            case("Thursday"):
                            if (graphData[4] === undefined){
                              graphData[4] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[4].favorites += tweet.favorites;
                                graphData[4].retweets += tweet.retweets;
                            }
                            break;

                            case("Friday"):
                            if (graphData[5] === undefined){
                              graphData[5] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[5].favorites += tweet.favorites;
                                graphData[5].retweets += tweet.retweets;
                            }
                            break;

                            case("Saturday"):
                            if (graphData[6] === undefined){
                              graphData[6] = {favorites: tweet.favorites, retweets: tweet.retweets};
                            }else {
                                graphData[6].favorites += tweet.favorites;
                                graphData[6].retweets += tweet.retweets;
                            }
                            break;
                            
                            default:
                            break;
                    }
                })
                console.log(graphData);
                let weekData = [...this.state.weekData];
                for(let i = 0; i < weekData[0].data.length; i++){
                    if(graphData[i] !== undefined){
                        weekData[0].data[i] = graphData[i].favorites
                        weekData[1].data[i] = graphData[i].retweets
                    }
                }
                this.setState({
                    weekData: weekData
             });

            })
        .catch(err => console.log(err))
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