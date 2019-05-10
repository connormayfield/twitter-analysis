import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import loginAPI from "../../utils/loginAPI";
import {Redirect} from "react-router-dom";
import "../Profile/style.css";
import twitterAPI from "../../utils/twitterAPI"
import UserSideBar from "../../components/UserSidebar/index"
import sideBarScript from "../../components/Sidebar/logic"
import LineGraph from "../../components/Graphs/LineGraph"
import moment from 'moment';
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
        username: "",
        isAuthenicated: true,
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
        ],
        tweet: [],
        user: {}
    }

    componentDidMount = () => {    
        sideBarScript.sideBarController()

        loginAPI.checkSession()
        .then((res)=> {
            if(!res.data){
                this.setState({isAuthenicated: false})
            }
            else{
                twitterAPI.getTweets(res.data.username, 'bootcamptweeter').then(res => {
                    console.log(res.data)
                    var user = {};
                    user.screen_name = res.data[0].user.screen_name;
                    user.location = res.data[0].user.location;
                    user.description = res.data[0].user.description;
                    user.url = res.data[0].user.url;
                    user.followers_count = res.data[0].user.followers_count;
                    user.friends_count = res.data[0].user.friends_count;
                    user.favourites_count = res.data[0].user.favourites_count;
                    user.profile_img = res.data[0].user.profile_img;
        
                    var newTweet = [];
                    for(var i = 0; i < res.data.length; i++){
                        const dateToFormat = res.data[i].created_at;
                        const formattedDate = moment(dateToFormat, "DDD MMM DD HH:mm:ss Z YYYY").format("MMM DD");
        
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
                        tweet:[...newTweet],
                    });
                    })
                .catch(err => console.log(err))
            }
        })
      

    }

    render(){  
        if(!this.state.isAuthenicated){
            return <Redirect to="/login"/>
        }

        return(
            <div>
            <UserSideBar/>
            <Container>
                <div className = "profileContainer">
                    <Row >
                            <Col size = "xs-3" >
                                <img src="https://via.placeholder.com/100" alt="profile-pic"></img>
                            </Col>
                            <div className = "userInfo">
                                <Col size="xs-9">
                                    <Row>               
                                        <Col size = "xs-12">
                                            <h5>Welcome back, {this.state.username}</h5>
                                        </Col>
                                    </Row>
                                    <Row>               
                                        <Col size = "xs-12">
                                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                    </Row>
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
                <div className="graphContainer">
                        <h4>Weekly Tweet Data Example</h4>
                            <LineGraph id="linegraph"
                            labels={this.state.weekLabels}
                            graphData={this.state.weekData} 
                            />
                </div>
                <Row>
                    <Col size="xs-12">
                        {!this.state.tweet.length ? (
                            <h1 className="text-center">No Tweets to Display</h1>
                        ) : (
                            <div>
                                {this.state.tweet.map((tweet, ind) => {
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
            </div>
        )
    }
}

export default Profile
