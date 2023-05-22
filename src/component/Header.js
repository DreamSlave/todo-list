import HeaderStyles from '../assets/css/Header.module.css'
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import React, { useState } from 'react';

function Header() {
    const [headLine, setHeadLine] = useState('');

    // useEffect(() => {
        getHeadLine()
        function getHeadLine(){

            ApiUtil.get(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}`)
                .then(function (response){
                    if(response.status === 200){

                    }
                })
        }
    // },[]);

    return (
        <div>
            <input
                className={HeaderStyles['no-border']}
                placeholder={'꿈을 입력해보세요.'}
            />
        </div>
    );
}

export default Header