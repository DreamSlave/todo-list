import React from "react";
import '../assets/css/App.module.css';
import styles from '../assets/css/App.module.css'
import Header from "../component/Header";


function First() {
  return (
      <div>
        <div className={styles['frame0']}>
          <div className={styles['group16']}>
            <div className={styles['navi']}>
              <Header />
            </div>
          </div>
          <div className={styles['frame1']}>
            <div className={styles['frame']}>
              <div>
              <span className={styles['text02']}>
                <span>해야할 일을 입력해보세요.</span>
              </span>
              </div>
            </div>
            <div className={styles['frame2']}>
            <span className={styles['text04']}>
              <span>비고를 입력해보세요.</span>
            </span>
            </div>
            <div className={styles['frame3']}>
              <div className={styles['tag']}>
              <span className={styles['text06']}>
                <span>카테고리를 입력해보세요.</span>
              </span>
              </div>
            </div>
          </div>
          <span className={styles['text08']}>
          <span>첫번째 할 일을 기록해보세요!</span>
        </span>
          <div className={styles['empty']}>
            <button>입장하기</button>
          </div>
        </div>
      </div>
  );
}

export default First;
