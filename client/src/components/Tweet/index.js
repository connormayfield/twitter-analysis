import React, {Component} from "react"
import moment from 'moment';
import { Container, Row, Col } from "../Grid";
import twitterAPI from "../../utils/twitterAPI"
import commentImg from "./img/comment.png"
import retweetImg from "./img/retweet.png"
import likeImg from "./img/heart.png"

class Tweet extends Component{
    state = {
        tweet: []
    }

    componentDidMount() {
        twitterAPI.getTweets("1234",'bootcamptweeter').then(res => {
            console.log(res.data)
            var newTweet = [];
            for(var i = 0; i < res.data.length; i++){
                // const dateToFormat = res.data.tweets[i].created_at;
                // console.log(dateToFormat);
                // const formattedDate = moment(dateToFormat, "DDD MMM DD HH:mm:ss Z YYYY").format("MMM DD");

                var oneTweet = {};
                oneTweet.id = res.data[i]._id;
                oneTweet.created_at = "MM/DD/YYYY";
                oneTweet.text = res.data[i].tweet_body;
                oneTweet.retweets = res.data[i].retweets;
                oneTweet.favorites = res.data[i].likes; 
                oneTweet.name = "Nunya"; 
                oneTweet.screen_name = res.data[i].handle; 
                oneTweet.user_id = "00000000020000"; 

                newTweet.push(oneTweet);
                }
            this.setState({tweet:[...newTweet]});
            })
        .catch(err => console.log(err))
        
    }

    render(){

        return(
            <Container>
                
            <Row>
                <Col size="xs-12">
                    {this.state.tweet.length === 0 ? (
                        <h1 className="text-center">No Tweets to Display</h1>
                    ) : (
                        <div>
                            {this.state.tweet.map(tweet => {
                                return (
                                    <div className="card" style={{"width": "18rem"}}>
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

export default Tweet