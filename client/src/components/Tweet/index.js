import React, {Component} from "react"
import { Container, Row, Col } from "../Grid";
import twitterAPI from "../../utils/twitterAPI"

class Tweet extends Component{
    state = {
        tweet: []
    }

    componentDidMount() {
        twitterAPI.getTweets('bootcamptweeter').then(res => {
            console.log(res.data.tweets)
            var newTweet = [];
            for(var i = 0; i < res.data.tweets.length; i++){
                var oneTweet = {};
                oneTweet.id = res.data.tweets[i].id;
                oneTweet.created_at = res.data.tweets[i].created_at;
                oneTweet.text = res.data.tweets[i].text;
                oneTweet.retweets = res.data.tweets[i].retweet_count;
                oneTweet.favorites = res.data.tweets[i].favorite_count; 
                oneTweet.name = res.data.tweets[i].user.name; 
                oneTweet.screen_name = res.data.tweets[i].user.screen_name; 
                oneTweet.user_id = res.data.tweets[i].user.id; 

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
                    {!this.state.tweet.length ? (
                        <h1 className="text-center">No Tweets to Display</h1>
                    ) : (
                        <div>
                            {this.state.tweet.map(tweet => {
                                return (
                                    <div className="card" style={{"width": "18rem"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{tweet.name} - @{tweet.screen_name} - {tweet.created_at}</h5>
                                            <p className="card-text">{tweet.text}</p>
                                            <a href="#" className="card-link">Comments:</a>
                                            <a href="#" className="card-link">Retweets: {tweet.retweets}</a>
                                            <a href="#" className="card-link">Likes: {tweet.favorites}</a>
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