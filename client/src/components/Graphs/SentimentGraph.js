import React from "react";
import { Doughnut } from "react-chartjs-2";

function SentimentGraph({ graphData }) {

    const data = {
        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        datasets: [
            {
                backgroundColor: [
                    graphData.primaryAnger || '#FF0000',
                    graphData.primaryDisgust || '#36A2EB',
                    graphData.primaryFear || '#7F00FF',
                    graphData.primaryJoy || '#00CC00',
                    graphData.primarySadness|| '#004C99'
                ],
                hoverBackgroundColor: [
                    graphData.secondaryAnger || '#FF0000',
                    graphData.secondaryDisgust || '#FF8000',
                    graphData.secondaryFear || '#7F00FF',
                    graphData.secondaryJoy || '#00CC00',
                    graphData.secondarySadness|| '#004C99'
                ],
                data: graphData.data
            }
        ]
    }

    return (
        <Doughnut data={data} />
    )
}

export default SentimentGraph;