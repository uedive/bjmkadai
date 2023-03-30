import React from 'react';
import {
    Chart as ChartJS,
    Filler,
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

ChartJS.register(Filler);
  
const options = {
    scales: {
        x: {
            type: 'linear',
            ticks: {
                callback: function(value, index, values) {
                    return value.toLocaleString(); // カンマ区切りしない形式に変更する
                }
            }
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

    //人口構成データが取得されていない場合は表示させない
    if(populationData.length === 0){
        return (
            <div></div>
        );
    }

    //チャート用のラベル情報を取得（すべての人口情報で西暦が一致している前提）
    const labels = populationData[0].data.map(item => String(item.year));

    //チャート表示用のデータを作成
    const nensyoData = populationData[1].data.map(item => item.value);
    const seisanData = populationData[2].data.map(item => item.value);
    const ronenData = populationData[3].data.map(item => item.value);
    

    const chartdata = {
        labels: labels, // X軸のラベル（年）
        datasets: [
            {
                label: '年少人口',
                data: nensyoData, // Y軸のデータ（人口数）
                fill: true,
                borderColor: 'rgb(255, 152, 150)',
                backgroundColor: "rgba(255, 152, 150, 0.8)",
                tension: 0.1
            },
            {
                label: '生産年齢人口',
                data: seisanData, // Y軸のデータ（人口数）
                fill: true,
                borderColor: ' rgb(174, 199, 232)',
                backgroundColor: " rgba(174, 199, 232, 0.8)",
                tension: 0.1
            },
            {
                label: '老年人口',
                data: ronenData, // Y軸のデータ（人口数）
                fill: true,
                borderColor: 'rgb(152, 223, 138)',
                backgroundColor: "rgba(152, 223, 138, 0.8)",
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