import React, { Component } from "react";
import WeekGraph from "../components/Graphs/WeekGraph";

class Weekly extends Component {

    state = {
        // Where data will go and be changed
        // Each object in the array will be a line in the graph
        // We can update this so that we can pass in other properties in here rather than go through the component
        data: [
            {
                data: [1, 2, 3, 4, 5, 6, 7]                
            }
        ]
    }

    render() {
        return (
            <div>
                <h1>Graph Page</h1>
                <WeekGraph graphData={this.state.data} />
            </div>
        )
    }
}

export default Weekly;