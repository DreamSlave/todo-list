import React from "react";
import styles from '../assets/css/Task.module.css'


function Task() {
  return (
    <div className="org pd10 {styles['frame2']}">
      <div className={styles['framecontainer1']}>
        <div className={styles['frameframe1']}>
          <div className={styles['frame-state']}>
            <img
                alt="Ellipse73218"
                src="/playground_assets/ellipse73218-ypf-200h.png"
                className={styles['ellipse71']}
            />
            <img
                alt="Ellipse83218"
                src="/playground_assets/ellipse83218-71zc-200h.png"
                className={styles['ellipse81']}
            />
            <img
                alt="Ellipse93218"
                src="/playground_assets/ellipse93218-iy6u-200h.png"
                className={styles['ellipse91']}
            />
          </div>
          <div className={styles['frame-button']}>
            <img
                alt="edit13218"
                src="/playground_assets/edit13218-9ibd-200h.png"
                className={styles['edit11']}
            />
            <img
                alt="close13218"
                src="/playground_assets/close13218-4857-200h.png"
                className={styles['close11']}
            />
          </div>
        </div>
        <div className={styles['frame09']}>
          <div className={styles['frame10']}>
            <div>
              <span className={styles['text10']}>
              <span>연구개발보고서 쓰기...</span>
              </span>
            </div>
            <div className={styles['frame12']}>
              <span className={styles['text12']}>
              <span>2021.09.24</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles['frame13']}>
          <div className={styles['frame14']}>
            <span className={styles['text14']}>
            <span>중요한 Task로써 열심히 해야합니다.</span>
            </span>
          </div>
        </div>
        <div className={styles['frame15']}>
          <img
              alt="fire13235"
              src="/playground_assets/fire13235-3abq-200w.png"
              className={styles['fire11']}
          />
        </div>
      </div>
    </div>
  );
}

export default Task;
