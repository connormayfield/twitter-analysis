import React from "react";
import {Container} from "../components/Grid/index"
import SideBar from "../components/Sidebar/index"

const Progress = ()=>{

    const style = {
        background: "url(\"https://www.pngkey.com/png/detail/14-141359_dead-bird-twitter.png\")",
        backgroundSize: "cover",
        backgroundRepeat: "none",
        height: "500px",
        color: "gray"

    }
    return(
        <div>
        <SideBar/>
        <Container>
            
            <div className = "jumbotron" style = {style}>
            <h4>Uh oh...</h4>
            <h4>We haven't added this functionality quite yet. Back to the connections home!</h4>
            </div>
            
        </Container>
        </div>

    )
}

export default Progress