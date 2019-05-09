import React from "react";
import {Container} from "../components/Grid/index"

const Error = ()=>{

    const style = {
        background: "url(\"https://www.pngkey.com/png/detail/14-141359_dead-bird-twitter.png\")",
        backgroundSize: "cover",
        backgroundRepeat: "none",
        height: "500px",
        color: "gray"

    }
    return(
        <Container>
            
            <div className = "jumbotron" style = {style}>
            <h4>Error 404</h4>
            <h4>This is not the page that you were looking for.</h4>
            </div>
            
        </Container>
    )
}

export default Error