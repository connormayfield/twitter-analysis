import React from "react"
import Spinner from "react-bootstrap/Spinner"
import "./style.css"

const Loading = (props) => {

    return(
        <div className = "loading-spinner">
            <p>Loading...</p>
            <Spinner  animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )

}

export default Loading;