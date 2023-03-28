import React from 'react';

const PopulationTable = ({ populationData }) => {

    if(populationData.length == 0){
        return (
            <div>
                
            </div>
        );
    }

    const labels = populationData.data.map(item => item.year);
    const data = populationData.data.map(item => item.value);

    var tableData = []
    
    populationData.data.map((item) => (
        tableData
    ));

    return (
        <div>
            <table class="text-center">
                <tr>
                    <th rowSpan={2}>西暦</th>
                    <th colSpan={2}>総人口</th>
                    <th colSpan={2}>年少人口</th>
                    <th colSpan={2}>生産年齢人口</th>
                    <th colSpan={2}>老年人口</th>
                </tr>
                <tr>
                    <th>人数</th>
                    <th>増加率</th>
                    <th>人数</th>
                    <th>割合</th>
                    <th>人数</th>
                    <th>割合</th>
                    <th>人数</th>
                    <th>割合</th>
                </tr>
                {populationData.data.map((item) => (
                    <tr>
                        <th>{item.year}</th>
                        <td>{item.value}</td>
                        <td>{item.year}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
  
};

export default PopulationTable;