import React, { useState, useEffect } from 'react';
import SojinkoChart from './SojinkoChart';
import SojinkoTable from './SojinkoTable';
import { fetchPrefectures, fetchPopulationComPosition } from '../../lib/api';

function Sojinko() {
    //都道府県情報を管理
    const [prefectures, setPrefectures] = useState([]);
    //都道府県のチェック状況の管理
    const [selectedItems, setSelectedItems] = useState({});
    const [populationData, setPopulationData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            //都道府県情報を取得する
            const result = await fetchPrefectures();
            setPrefectures(result);
            
            //チェックボックスの状態を完了するオブジェクトを初期化する
            const initialSelectedItems = {};
            result.forEach(prefecture => {
                initialSelectedItems[prefecture.prefCode] = false;
            });
            setSelectedItems(initialSelectedItems);

            //人口状態のオブジェクトを初期化する
            setPopulationData([]);
        };
        fetch();
    }, []);

    // チェックボックスがクリックされたときに呼び出されるハンドラー関数
    const handleCheckboxChange = async event => {
        const result = await fetchPopulationComPosition(event.target.value);
        setPopulationData(result.data);
    };

    return (
        <div className="sojinko">
            <div className="flex flex-wrap" id="prefCds" multiple>
                {prefectures.map((prefecture) => (
                    <div className="p-1" key={prefecture.prefCode}>
                         <input
                            type="radio"
                            value={prefecture.prefCode}
                            name="pref-radio"
                            selected={selectedItems[prefecture.prefCode]}
                            onChange={handleCheckboxChange}
                            id={"pref"+prefecture.prefCode}
                        />
                        <label htmlFor={"pref"+prefecture.prefCode}>{prefecture.prefName}</label>
                    </div>
                ))}
            </div>

            <SojinkoChart populationData={populationData} />

            <SojinkoTable populationData={populationData} />
                    
        </div>
    );
}


export default Sojinko;