import React, { Component } from "react";
import LineGraph from "../Graphs/LineGraph";
import DoughnutGraph from "../Graphs/DoughnutGraph";

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
                data: []                
            },
            {
                label: "Retweets",
                backgroundColor: "#00FF0044",
                primaryColor: "#00FF00",
                data: []
            }
        ],
        sentimentData: []
    }

    componentDidMount() {

        this.weekRandom();
        this.sentimentRandom();
    }

    componentWillMount() {
        
        this.setState({
             weekInterval: setInterval(this.weekRandom, 5000),
             sentimentInterval: setInterval(this.sentimentRandom, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.weekInterval);
        clearInterval(this.state.sentimentInterval);
    }


    weekRandom = () => {

        let newData = [...this.state.weekData];

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
        const newData = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

        const sum = newData.reduce( (total, num) => total + num);

        const newSentiment = [(newData[0] / sum * 100).toFixed(2), 
                              (newData[1] / sum * 100).toFixed(2), 
                              (newData[2] / sum * 100).toFixed(2), 
                              (newData[3] / sum * 100).toFixed(2), 
                              (newData[4] / sum * 100).toFixed(2)]

        this.setState({ sentimentData: newSentiment })
    }

    render() {
        // console.log(this.state.weekData)
        return (
            <div className="text-center">
                <h5>Weekly Likes & Retweets</h5>
                <LineGraph 
                    labels={this.state.weekLabels}
                    graphData={this.state.weekData} 
                />
                <h5>Comment Sentiment</h5>
                <DoughnutGraph
                    labels={this.state.sentimentLabels}
                    graphData={this.state.sentimentData}
                />
            </div>
        )
    }
}

export default Weekly;