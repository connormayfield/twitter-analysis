import React, {Component} from "react";
import {Container, Row, Col} from "../../components/Grid/index";
import "../Profile/style.css";
import "../../components/TweetCard/index"
import LineGraph from "../../components/Graphs/LineGraph"
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
                this.setState({
                    loading: false
                })
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

            twitterAPI.getTweets(this.props.user.username, "bootcamptweeter").then(({data}) => {
                //Gathering user information

                let weekData = [...this.state.weekData];

                for(let i = 0; i < data.weeklyData.length; i++){
                    if(data.weeklyData[i] !== null){
                        weekData[0].data[i] = data.weeklyData[i].favorites
                        weekData[1].data[i] = data.weeklyData[i].retweets
                    }
                }
                    this.setState({username: this.props.user.username,
                        user: data.user,
                        tweets: data.newTweets,
                        isAuthenicated: true,
                        weekLabels: data.labels,
                        weekData: weekData
                    });
            })

            .catch(err => console.log(err))
        }

    connect = () => {
        window.open("http://127.0.0.1:3001/api/user/connect/twitter", "_self");
    }

    render(){  
        console.log(this.state.username)
        return(
            <Container>
                <div className="imageContainer"></div>
                <div className = "profileContainer">
                    <Row >
                        <Col size = "xs-4" >
                            <div className="">
                                <img className="profile-image" src={this.state.user.profile_image_url_https} alt="profile-pic"></img>
                            </div>
                        </Col>
                        <Col size = "xs-4">
                            <div className="">
                                <h5>{this.state.user.name}</h5>
                                <h6>@{this.state.user.screen_name}</h6>
                                <h6>{this.state.user.location}</h6>
                                <h6>{this.state.user.description}</h6>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="widgetContainer">
                    <h4 className="feedTitle">Your Account Overall</h4>
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
                    <div className="graph">
                        <LineGraph key="1" id="linegraph"
                        labels={this.state.weekLabels}
                        graphData={this.state.weekData}/>
                    </div>
                </div>
                <Row>
                    <div className="container-fluid">
                    <div className="">
                    {/* <Col size="xs-12"> */}
                        {this.state.tweets.length === 0 ? (
                            <h4 className="feedTitle text-center">Nothing to display... Better get to work!</h4>
                        ) : (
                            <div>
                                <h4 className="feedTitle">Recent Tweets</h4>
                                <div className="card-container">
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
                                                donutModalHandler = {()=>{this.showModal(this.state.username, "bootcamptweeter", tweet.id)}}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>  
                            </div>
                        )}
                    {/* </Col> */}
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