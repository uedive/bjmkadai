import React from 'react';

const PopulationTable = ({ populationData }) => {

    if(populationData.length === 0){
        return (
            <div></div>
        );
    }
    
    const sojinkoData = populationData[0].data.map(item => item);
    const nensyoData = populationData[1].data.map(item => item);
    const seisanData = populationData[2].data.map(item => item);
    const ronenData = populationData[3].data.map(item => item);

    const sortedSojinkoData = sojinkoData.sort((a, b) => b.year - a.year);
    const sortedNensyoData = nensyoData.sort((a, b) => b.year - a.year);
    const sortedSeisanData = seisanData.sort((a, b) => b.year - a.year);
    const sortedRonenData = ronenData.sort((a, b) => b.year - a.year);

    /*
        総人口～老年人口データはすべて同じ長さであることを前提に動作させる
    */
    const listItems = sortedSojinkoData.map((item, index) => {

        const prevItem = sortedSojinkoData[index + 1];

        const increaseRate = prevItem ? ((item.value - prevItem.value) / item.value) * 100 : null;
        
        return (
          <tr key={index}>
            <td>{item.year}</td>
            <td>{item.value.toLocaleString()}</td>
            <td className={increaseRate > 0 ? "text-blue-500" : "text-red-500"}>{increaseRate && <span>{increaseRate.toFixed(1)}%</span>}</td>
            <td>{sortedNensyoData[index].value.toLocaleString()}</td>
            <td>{sortedNensyoData[index].rate}%</td>
            <td>{sortedSeisanData[index].value.toLocaleString()}</td>
            <td>{sortedSeisanData[index].rate}%</td>
            <td>{sortedRonenData[index].value.toLocaleString()}</td>
            <td>{sortedRonenData[index].rate}%</td>
          </tr>
        );
    });

    return (
        <div>
            <table className="main-table">
                <thead>
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
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    );
  
};

export default PopulationTable;