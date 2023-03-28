import React, { useState, useEffect } from 'react';
import { fetchPrefectures } from '../../lib/api';

function Sojinko(/*props*/) {
    const [prefectures, setPrefectures] = useState([]);
    const [checkedItems, setCheckedItems] = useState({}); // チェック状態を管理するオブジェクト

    useEffect(() => {
        const fetch = async () => {
            const result = await fetchPrefectures();
            setPrefectures(result);
        };
        fetch();
        const initialCheckedItems = {};
        prefectures.forEach(prefecture => {
                initialCheckedItems[prefecture.prefCode] = false;
        });
        setCheckedItems(initialCheckedItems);
    }, []);

    // チェックボックスがクリックされたときに呼び出されるハンドラー関数
    const handleCheckboxChange = event => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
    };

    // 表示ボタンを押下した際に呼ばれる関数
    function displayButtonOn() {
        console.log(checkedItems);
    };

    return (
        <div className="sojinko">
            <h1>都道府県のID</h1>
            <div class="flex flex-wrap" id="prefCds" multiple>
                {prefectures.map((prefecture) => (
                    <div class="p-1">
                         <input
                            type="checkbox"
                            name={prefecture.prefCode}
                            checked={checkedItems[prefecture.prefCode]}
                            onChange={handleCheckboxChange}
                        />
                        <label for={"pref"+prefecture.prefCode}>{prefecture.prefName}</label>
                    </div>
                ))}
            </div>
            <button 
                class="my-btn"
                onClick={displayButtonOn}
            >表示</button>

            
        </div>
    );
}


export default Sojinko;