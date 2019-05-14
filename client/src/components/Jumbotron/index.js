import React from "react";
import "./style.css";

function Jumbotron({ children, title }) {
    return (
        <div className="jumbotron text-center">
            <div className="overlay"></div>
            <div className="background-image"></div>
            <div className="caption">
                <h1>{title}</h1>
                { children }
            </div>
        </div>
    );
}

export default Jumbotron;