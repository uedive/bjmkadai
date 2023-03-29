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
        x: {
            type: 'linear'
        },
        y: {
            type: 'linear',
            stacked: true
        }
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
        },
    }
};

const PopulationChart = ({ populationData }) => {

    if(populationData.length === 0){
        return (
            <div></div>
        );
    }

    const labels = populationData[0].data.map(item => item.year);
    const nensyoData = populationData[1].data.map(item => item.value);
    const seisanData = populationData[2].data.map(item => item.value);
    const ronenData = populationData[3].data.map(item => item.value);
    
    const chartdata = {
        labels: labels, // X軸のラベル（年）
        datasets: [
            {
                label: '年少人口',
                data: nensyoData, // Y軸のデータ（人口数）
                fill: 0,
                borderColor: 'rgb(192, 192, 74)',
                backgroundColor: "rgba(158,72,14,1)",
                tension: 0.1
            },
            {
                label: '生産年齢人口',
                data: seisanData, // Y軸のデータ（人口数）
                fill: 0,
                borderColor: 'rgb(192, 150, 74)',
                backgroundColor: "rgba(158,100,14,1)",
                tension: 0.1
            },
            {
                label: '老年人口',
                data: ronenData, // Y軸のデータ（人口数）
                fill: 0,
                borderColor: 'rgb(192, 120, 74)',
                backgroundColor: "rgba(158,130,14,1)",
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