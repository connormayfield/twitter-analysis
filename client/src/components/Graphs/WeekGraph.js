import React from "react";
import { Line } from "react-chartjs-2";

function LineGraph({ graphData }) {

    const getDatasets = () => {

        let datasets = [];

        for (let i = 0; i < graphData.length; i++) {
            datasets.push ({
                label: "Likes",
                fill: false,
                backgroundColor: graphData[i].primary || "#48dd78",
                borderColor: graphData[i].primary || "#48dd78",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: graphData[i].primary || "#48dd78",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: graphData[i].primary || "#48dd78",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: graphData[i].data
            });
        }

        return datasets;
    }

    const data = {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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