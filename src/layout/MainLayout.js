import React, { useState } from 'react';
import '../assets/css/App.css';
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import {Outlet, useNavigate} from "react-router-dom";
import styles from "../assets/css/App.module.css";
import Header from "../component/Header";
import {useEffect} from "react";

function MainLayout() {

    const movePage = useNavigate();

    const [isExistTask, setIsExistTask] = useState(false);

    useEffect(() => {
        ApiUtil.post(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}/query`).then(function (response) {
            if (response.status === 200) {
                setIsExistTask(true)
                if(response.data.results.length > 0){
                    movePage('/main');
                }else {
                    movePage('/first');
                }
            }
        })
    },[]);


    return (
        <div>
            {(()=>{
                if(isExistTask){
                    return <div>
                                <div className={'w100'}>
                                    <div className={styles['navi']}>
                                        <Header />
                                    </div>
                                </div>
                                <Outlet></Outlet>
                            </div>
                }
            })()}
        </div>
    );
}
export default MainLayout;
