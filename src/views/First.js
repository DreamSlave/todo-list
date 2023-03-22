import React from "react";
import Card from "@mui/material/Card";
import '../assets/css/App.css';
import styles from '../assets/css/App.module.css'
import firstStyles from '../assets/css/First.module.css'
import Header from "../component/Header";
import HeaderStyles from "../assets/css/Header.module.css";


function First() {
  return (
      <div>
        <div className={styles['frame0']}>
          <div className={styles['group16']}>
            <div className={styles['navi']}>
              <Header />
            </div>
          </div>
          <div className={'w50 center '}>
            <span className={'font60 pdb10' + firstStyles['fit']}>첫번째 할 일을 기록해보세요!</span>
            <Card sx={{ width : '100%', marginTop : '10px' }}>
              <div className={'light_yellow pd30'}>
                <div className={'pdt20'}>
                  <input className={HeaderStyles['no-border']}
                         style={{ backgroundColor:'transparent', width : '100%' }}
                         placeholder={'해야할 일을 입력해보세요.'}/>
                </div>
                <div className={'pdt10'}>
                  <textarea className={'w100 '+HeaderStyles['no-border']}
                            style={{ backgroundColor:'transparent', height : '300px', fontSize : '18px', resize : 'none' }}
                            placeholder={'비고를 입력해보세요.'}/>
                </div>
                <div className={styles['frame3']}>

                </div>
              </div>
            </Card>
          </div>
          <div className={styles['empty']}>
            <button className={'mgl20 mgr20 ' + styles['orange']}>입장하기</button>
          </div>
        </div>
      </div>
  );
}

export default First;
