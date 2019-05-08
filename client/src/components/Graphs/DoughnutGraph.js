import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutGraph({ graphData, labels }) {

    const data = {
        labels: labels,
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
                data: graphData
            }
        ]
    }

    const legend = {
        position: 'bottom'
    }

    return (
        <Doughnut data={data} legend={legend} />
    )
}

export default DoughnutGraph;