import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
const options = {
    scales: {
        xAxes: [
        {
            ticks: {
            fontColor: '#ccc',
            fontSize: 14
            }
        }
        ],
        yAxes: [
        {
            ticks: {
                fontColor: '#ccc',
                fontSize: 14,
                beginAtZero: true
            },
            gridLines: {
                color: '#ccc'
            }
        }
        ]
    },
    legend: {
        labels: {
        fontColor: '#ccc',
        fontSize: 14
        }
    },
    elements: {
        point: {
            radius: 0
        }
    }
};

const PopulationChart = ({ populationData }) => {

    if(populationData.length == 0){
        return (
            <div>
                
            </div>
        );
    }

    const labels = populationData.data.map(item => item.year);
    const data = populationData.data.map(item => item.value);

    console.log(labels);
    
    const chartdata = {
        labels: labels, // X軸のラベル（年）
        datasets: [
            {
                label: '総人口',
                data: data, // Y軸のデータ（人口数）
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <Line data={chartdata} options={options} />
        </div>
    );
  
};

export default PopulationChart;