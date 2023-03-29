import React, { useState, useEffect } from 'react';
import SojinkoTable from './SojinkoTable';
import { fetchPrefectures, fetchPopulationComPosition } from '../../lib/api';

function Sojinko() {
    const [prefectures, setPrefectures] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [populationData, setPopulationData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            //都道府県情報を取得する
            const result = await fetchPrefectures();
            setPrefectures(result);
            
            //チェックボックスの状態を完了するオブジェクトを初期化する
            const initialCheckedItems = {};
            result.forEach(prefecture => {
                initialCheckedItems[prefecture.prefCode] = false;
            });
            setCheckedItems(initialCheckedItems);

            //人口状態のオブジェクトを初期化する
            setPopulationData([]);
        };
        fetch();
    }, []);

    // チェックボックスがクリックされたときに呼び出されるハンドラー関数
    const handleCheckboxChange = event => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
    };

    // 表示ボタンを押下した際に呼ばれる関数
    async function displayButtonOn() {
        for (const key in checkedItems) {
            if(checkedItems[key]){
                const result = await fetchPopulationComPosition(key);
                setPopulationData(result.data);
                break;
            }
        }
    };

    return (
        <div className="sojinko">
            <div className="flex flex-wrap" id="prefCds" multiple>
                {prefectures.map((prefecture) => (
                    <div className="p-1" key={prefecture.prefCode}>
                         <input
                            type="checkbox"
                            name={prefecture.prefCode}
                            checked={checkedItems[prefecture.prefCode]}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={"pref"+prefecture.prefCode}>{prefecture.prefName}</label>
                    </div>
                ))}
            </div>
            <button 
                className="my-btn"
                onClick={displayButtonOn}
            >
                表示
            </button>

            <SojinkoTable populationData={populationData} />
                    
        </div>
    );
}


export default Sojinko;