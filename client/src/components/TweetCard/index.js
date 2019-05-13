import React from "react";
import commentImg from "../../pages/Profile/img/comment.png"
import retweetImg from "../../pages/Profile/img/retweet.png"
import likeImg from "../../pages/Profile/img/heart.png"
import graphImg from "../../pages/Profile/img/graph-button.png"
// import "./style.css"

const TweetCard = props=>{
    const cardStyle = {
        marginTop: 5,
        marginLeft: 35,
        width: "20rem"
    }

    return <div className="card" style={cardStyle}>
    <div className="card-body">
        <h6 className="card-title">{props.tweet_name} - @{props.screen_name} - {props.created_at}</h6>
        <p className="card-text">{props.text}</p>
        <a href="/#" className="card-link"><img src={commentImg} alt="comment-icon"/></a>
        <a href="/#" className="card-link"><img src={retweetImg} alt="retweet-icon"/>{props.retweets}</a>
        <a href="/#" className="card-link"><img src={likeImg} alt="like-icon"/>{props.favorites}</a>
        <span><img src={graphImg} alt="graph-icon" onClick = {props.donutModalHandler}/></span>
    </div>
</div>

}

export default TweetCard


