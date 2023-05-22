import HeaderStyles from '../assets/css/Header.module.css'
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import React, { useState, useEffect } from 'react';

function Header() {
    const [headLine, setHeadLine] = useState('');

    useEffect(() => {
        getHeadLine()
    },[]);

    function getHeadLine() {
        ApiUtil.get(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}`)
            .then(function (response) {
                if (response.status === 200) {
                    setHeadLine(response.data.title[0].plain_text)
                }else {
                    alert("HeadLine read fail.")
                }
            })
    }

    function saveHeadLine(targetValue){
        if(headLine !== targetValue){
            let params = {
                title: [{text: {content: `${targetValue}`}}],
            }
            ApiUtil.patch(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}`,params)
                .then(function (response) {
                    if (response.status === 200) {
                        setHeadLine(`${targetValue}`)
                    }else {
                        alert("HeadLine update fail.")
                    }
                })
        }
    }
    return (
        <div>
            <input
                className={HeaderStyles['no-border']}
                placeholder={'꿈을 입력해보세요.'}
                defaultValue={headLine}
                onBlur={(e)=>{
                    e.preventDefault();
                    saveHeadLine(e.target.value)
                }}
            />
        </div>
    );
}

export default Header