import React, { useState } from 'react';
import '../assets/css/App.css';
import ApiUtil from "../api/api.util";
import ApiConfig from "../api/api.config";
import {Outlet, useNavigate} from "react-router-dom";
import styles from "../assets/css/App.module.css";
import Header from "../component/Header";

function MainLayout() {

    const movePage = useNavigate();
    ApiUtil.post(`${ApiConfig.notionDomain}/v1/databases/${ApiConfig.mainDataBaseId}/query`).then(function (response) {
        if (response.status === 200) {
            if(response.data.results.length > 0){
                movePage('/main');
            }
        }
    })

    return (
        <div>
            <div className={'w100'}>
                <div className={styles['navi']}>
                    <Header />
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
}
export default MainLayout;
