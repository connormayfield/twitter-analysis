import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import "../Profile/style.css";
import "../../components/TweetCard/index"
import LineGraph from "../../components/Graphs/LineGraph"
import loginAPI from "../../utils/loginAPI";
import twitterAPI from "../../utils/twitterAPI"
import TweetCard from "../../components/TweetCard/index";
import Modal from "react-bootstrap/Modal"
import Loading from "../../components/LoadingScreen/index"
import DoughnutGraph from "../../components/Graphs/DoughnutGraph";
import sentimentAPI from "../../utils/sentimentAPI";

class Profile extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.showModal = (username, twitterHandle, tweetID)=>{

            this.setState({showModal: true, loading: true})

            sentimentAPI.create(username, twitterHandle, tweetID)
            .then(({data})=>{
                setTimeout(() => {this.setState({
                    loading: false
                })
            }, 500);
                if(!data.errors){
                    this.setState({
                        sentimentData: [data.anger, data.disgust, data.fear, data.joy, data.sadness]
                    })
                }
            })
            .catch((err) => {console.log(err)})
        }

        this.hideModal =  () => {
            this.setState({
                sentimentData: [],
                showModal: false
            })
    
        }
    
        this.state = {
            user: {},
            tweets:[],
            username: "",
            tweetHandle: "",
            photo: "",
            screen_name: "",
            isAuthenicated: false,
            modalShow: false,
            weekLabels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekData: [
                {
                    label: "Likes",
                    backgroundColor: "#82AFC344",
                    primaryColor: "#82AFC3",
                    data: [0, 0, 0, 0, 0, 0, 0]
                },
                {
                    label: "Retweets",
                    backgroundColor: "#04507344",
                    primaryColor: "#045073",
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ],
            sentimentLabels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
            sentimentData: []
        }
      }
 


    componentWillMount = () => {
            loginAPI.checkSession()
            .then(({data}) => {
                console.log(data)
                if(data.twitter){
                    this.setState({
                        tweetHandle: data.twitter.handle,
                        photo: data.twitter.photo,
                        screen_name: data.twitter.displayName
                    }, function(){
                        twitterAPI.getTweets(this.props.user.username, this.state.tweetHandle).then(({data}) => {
                            //Gathering user information
                            // console.log(data.user);
                            if (data.weeklyData === "none") {
                                return this.setState({
                                    username: this.props.user.username,
                                    user: data.user
                                })
                            }
                            let weekData = [...this.state.weekData];
            
                            for(let i = 0; i < data.weeklyData.length; i++){
                                if(data.weeklyData[i] !== null){
                                    weekData[0].data[i] = data.weeklyData[i].favorites
                                    weekData[1].data[i] = data.weeklyData[i].retweets
                                }
                            }
                            console.log(data.user);
                                this.setState({username: this.props.user.username,
                                    user: data.user,
                                    tweets: data.newTweets,
                                    isAuthenicated: true,
                                    weekLabels: data.labels,
                                    weekData: weekData
                                });
                        })
                        .catch(err => console.log(err))
                    })
                }
            });

 
}
        
    render(){  
        console.log(this.state.username)
        return(
            <Container>
                <Row >
                    <i className="fab fa-twitter bird"></i>
                    <p className="twitter-heading">Twitter</p>
                </Row>
                <Row>
                    <div className="twitterDescription">
                        <h5 className="twitterDescription1">Track your weekly likes, retweets and followers here.</h5>
                        <h6 className="twitterDescription1">Get a sentiment analysis of your recent mentions by clicking the graph icon on a particular tweet.</h6>
                    </div>
                </Row>
                <div className = "profileContainer">
                    <h4 className="feedTitle">Account</h4>
                    <h6 className="feedDescription">Your profile</h6>
                    <Row className="twitter-profile">
                        <Col size = "xs-4" >
                            <div className="">
                                <img className="profile-image" src={this.state.photo} alt="profile-pic"></img>
                            </div>
                        </Col>
                        <Col size = "xs-8">
                            <div className="profile-text">
                                <h5>{this.state.user.name}</h5>
                                <h6>@{this.state.user.screen_name}</h6>
                                <h6>{this.state.user.location}</h6>
                                <h6>{this.state.user.description}</h6>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="widgetContainer">
                    <Row>
                        <div className="widget statuses border">
                            <Col size="xs-4" >
                                <span>Tweets</span>
                                <br></br>
                                <span className="font-weight-bold">{this.state.user.statuses_count}</span>
                            </Col>
                        </div>
                        <div className="widget tweets border">
                            <Col size="xs-4" >
                                <span>Friends</span>
                                <br></br>
                                <span className="font-weight-bold">{this.state.user.friends_count}</span>
                            </Col>
                        </div>
                        <div className="widget followers border">
                            <Col size="xs-4">
                                <span>Followers</span>
                                <br></br>
                                <span className="font-weight-bold">{this.state.user.followers_count}</span>
                            </Col>
                        </div>
                        <div className="widget likes border">
                            <Col size="xs-4">
                                <span>Likes</span>
                                <br></br>
                                <span className="font-weight-bold">{this.state.user.favourites_count}</span>
                            </Col>
                        </div>
                    </Row>
                </div>
                <div className="graphContainer">
                    <h4 className="feedTitle">Weekly Insight</h4>
                    <h6 className="feedDescription">Last week's likes and retweets, tracked by the day</h6>
                    <div className="graph  border">
                        <LineGraph key="1" id="linegraph"
                        labels={this.state.weekLabels}
                        graphData={this.state.weekData}/>
                    </div>
                </div>
                <Row>
                    <div className="container-fluid">
                        <div>
                        {/* <Col size="xs-12"> */}
                            {this.state.tweets.length === 0 ? (
                                <h4 className="feedTitle feed-empty text-center">Nothing to display... Better get to work!</h4>
                            ) : (
                                <div>
                                    <h4 className="feedTitle">Recent Tweets</h4>
                                    <h6 className="feedDescription1">Your current timeline</h6>
                                    <h6 className="feedDescription">Click the Graph button to see the sentiment chart</h6>
                                    <div className="card-container border">
                                        <div className="row flex-row flex-nowrap twitterFeed">
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
                                                    donutModalHandler = {()=>{this.showModal(this.state.username, this.state.tweetHandle, tweet.id)}}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>  
                                </div>
                            )}
                        {/* </Col> */}
                        </div>
                        <div className="scroll">
                            <div id="leftScroll"></div>
                            <div id="rightScroll"></div>
                        </div>
                    </div>

                    
                </Row>
                <Modal show={this.state.showModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sentiment Data</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        {this.state.sentimentData.length > 0 ? (<DoughnutGraph
                        labels={this.state.sentimentLabels}
                        graphData={this.state.sentimentData}
                        />) : ((this.state.loading) ? (<Loading/>) : ("No sentiment data is avaiable"))}
                        </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
             </Modal>
            </Container>


        )
    }
}


export default Profile;