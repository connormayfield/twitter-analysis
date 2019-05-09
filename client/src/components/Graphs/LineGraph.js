import React from "react";
import { Line } from "react-chartjs-2";

function LineGraph({ graphData, labels }) {

    const getDatasets = () => {

        let datasets = [];

        for (let i = 0; i < graphData.length; i++) {
            datasets.push ({
                label: graphData[i].label,
                fill: true,
                backgroundColor: graphData[i].backgroundColor || "#48dd78",
                borderColor: graphData[i].primaryColor || "#48dd78",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: graphData[i].primaryColor || "#48dd78",
                pointBackgroundColor: "#ccc",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: graphData[i].primaryColor || "#48dd78",
                pointHoverBorderColor: "#ccc",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                fillOpacity: .8,
                data: graphData[i].data
            });
        }

        return datasets;
    }

    const data = {
        labels: labels,
        datasets: getDatasets()
    }

    switch (graphData.length) {
        case 0:
            return (
                <div>
                    <h3>There is no Data for the graph</h3>
                </div>
            )
    
        default:
            return <Line data={data} />            
    }

}

export default LineGraph;