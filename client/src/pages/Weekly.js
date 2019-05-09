import React, { Component } from "react";
import LineGraph from "../components/Graphs/LineGraph";
import DoughnutGraph from "../components/Graphs/DoughnutGraph";

class Weekly extends Component {

    state = {
        // Where data will go and be changed
        // Each object in the array will be a line in the graph
        // We can update this so that we can pass in other properties in here rather than go through the component
        weekLabels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        sentimentLabels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        // Background Color will be the fill with opacity, primary will be the usually be the same w/o the opacity
        weekData: [
            {
                label: "Likes",
                backgroundColor: "#CC000044",
                primaryColor: "#CC0000",
                data: [1, 2, 3, 4, 5, 6, 7]                
            },
            {
                label: "Retweets",
                backgroundColor: "#00FF0044",
                primaryColor: "#00FF00",
                data: [7, 6, 5, 4, 3, 2, 1]
            }
        ],
        sentimentData: [40, 75, 140, 160, 200]
    }

    weekRandom = () => {

        let newData = this.state.weekData;

        for (let x = 0; x < newData.length; x++) {

            let array = [];
            for (let i = 0; i < this.state.weekLabels.length; i++){
                array.push(Math.floor(Math.random() * 100));
            }
        
            newData[x].data = array;
        }
        // console.log(newData);

        this.setState({ weekData: newData })

    };

    sentimentRandom = () => {
        const newData = [0.5, 0.6, 0.1, 1.3, 2];

        this.setState({ sentimentData: newData })
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    componentDidMount() {
        this.setState({ weekInterval: setInterval(this.weekRandom, 5000) });
        this.setState({ sentimentInterval: setInterval(this.sentimentRandom, 5000) });
    }

    componentWillUnmount() {
        clearInterval(this.state.weekInterval);
        clearInterval(this.state.sentimentInterval);
    }

    render() {
        return (
            <div className="text-center">
                <h4>Weekly Tweet Data Example</h4>
                <LineGraph 
                    labels={this.state.weekLabels}
                    graphData={this.state.weekData} 
                />
                <h4>Sentiment Tweet Data Example</h4>
                <DoughnutGraph
                    labels={this.state.sentimentLabels}
                    graphData={this.state.sentimentData}
                />
            </div>
        )
    }
}

export default Weekly;