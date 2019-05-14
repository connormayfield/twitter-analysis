import React from "react";
import {Container} from "../components/Grid/index"
import SideBar from "../components/Sidebar/index"
import bird from "../components/SignupComponent/bluetwitter.jpg";

const Error = ()=>{

    const style = {
        backgroundImage: `url(${bird})`,
        backgroundSize: "cover",
        backgroundRepeat: "none",
        height: "560px",
        color: "gray"

    }
    return(
        <div>
        <SideBar/>
        <Container>
            
            <div className = "jumbotron" style = {style}>
            <h4>Error 404</h4>
            <h4>This is not the page that you were looking for.</h4>
            </div>
            
        </Container>
        </div>

    )
}

export default Error