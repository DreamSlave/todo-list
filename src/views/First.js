import React from "react";
import Card from "@material-ui/core/Card";
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
          <div className={'w40 center '}>
            <span className={'font60 ' + firstStyles['fit']}>첫번째 할 일을 기록해보세요!</span>
            <Card sx={{ width : '100px' }}>
              <div className={'light_yellow '}>
                <div className={'pd25 '}>
                  <div>
                  <span className={styles['text02']}>
                    <input className={HeaderStyles['no-border']}
                           style={{ backgroundColor:'transparent' }}
                           placeholder={'해야할 일을 입력해보세요.'}/>
                  </span>
                  </div>
                </div>
                <div className={styles['frame2']}>
                {/*<span className={styles['text04']}>*/}
                {/*  <span>비고를 입력해보세요.</span>*/}
                {/*</span>*/}
                </div>
                <div className={styles['frame3']}>
                  {/*<div className={styles['tag']}>*/}
                  {/*<span className={styles['text06']}>*/}
                  {/*  <span>카테고리를 입력해보세요.</span>*/}
                  {/*</span>*/}
                  {/*</div>*/}
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
