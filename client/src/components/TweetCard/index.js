import React from "react";
import commentImg from "../../pages/Profile/img/comment.png"
import retweetImg from "../../pages/Profile/img/retweet.png"
import likeImg from "../../pages/Profile/img/heart.png"
import graphImg from "../../pages/Profile/img/graph-button.png"

const TweetCard = props=>{
    const cardStyle = {
        marginRight: 7,
        width: "20rem",
        position: "relative",
        height: 310
    }

    return (
        <div style={cardStyle} className="card">
            <div className="card-body">
                <h6 className="card-title">{props.name} @{props.screen_name}</h6>
                <h6 className="card-title">{props.created_at}</h6>
                <hr></hr>
                <p className="card-text">{props.text}</p>
                <div className="tweet-stats">
                    <a href={"https://twitter.com/"+props.screen_name+"/with_replies"} target="_blank" className="card-link"><img src={commentImg} alt="comment-icon"/>  </a>
                    <a href="https://twitter.com/mentions" target="_blank" className="card-link"><img src={retweetImg} alt="retweet-icon"/>  {props.retweets}</a>
                    <a href="https://twitter.com/i/notifications" target="_blank" className="card-link"><img src={likeImg} alt="like-icon"/>  {props.favorites}</a>
                    <span className="card-link"><img src={graphImg} alt="graph-icon" onClick = {props.donutModalHandler}/>  Graph</span>
                </div>
            </div>
        </div>
    )
}

export default TweetCard


