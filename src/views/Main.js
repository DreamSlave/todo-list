import React from "react";
import styles from '../assets/css/Main.module.css'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SearchIconPath from '../assets/imgs/searchicon1251-pj.svg'

function Main() {
  return (
    <div>
        <div className={styles['container1']}>
            <div className={styles['header']}>
                <div className={styles['title-text']}>
                    <span >진미님 힘내세요</span>
                </div>
            </div>
            <div className={styles['main-task-list']}>
                <div className={styles['empty']}>
                    <span className={styles['text01']}>+</span>
                </div>
                <div className={styles['frame1']}>
                </div>
                <div className={styles['frame2']}>
                </div>
                <div className={styles['frame3']}>
                </div>
            </div>
            <div className={styles['search']}>
                <div className={styles['search1']}>
                    <div className={styles['searchbar']}>
                        <div className={styles['searchbar1']}>
                            <div className={styles['frame25']}>
                                <img
                                    src={SearchIconPath}
                                    className={styles['searchicon']}
                                />
                            </div>
                        </div>
                    </div>
                    <Button variant="contained">Contained</Button>
                </div>
                <div className={styles['search-tag']}>
                    <Chip label="Chip Filled" />
                    <Chip label="Chip Outlined" variant="outlined" />
                    <Chip label="Chip Filled" />
                    <Chip label="Chip Outlined" variant="outlined" />
                    <Chip label="Chip Outlined" variant="outlined" />
                </div>
            </div>
            <div className={styles['task-list']}>
                <div className={styles['empty1']}>
                    <span className={styles['text32']}>+</span>
                </div>
                <div className={styles['frame11']} className={styles['frame11']}>
                    <div className={styles['framecontainer3']}>
                        <div className={styles['frameframe3']}>
                            <div className={styles['frame26']}>
                                <img
                                    alt="Ellipse73218"
                                    src="/playground_assets/ellipse73218-ypf-200h.png"
                                    className={styles['ellipse73']}
                                />
                                <img
                                    alt="Ellipse83218"
                                    src="/playground_assets/ellipse83218-71zc-200h.png"
                                    className={styles['ellipse83']}
                                />
                                <img
                                    alt="Ellipse93218"
                                    src="/playground_assets/ellipse93218-iy6u-200h.png"
                                    className={styles['ellipse93']}
                                />
                            </div>
                            <div className={styles['frame27']}>
                                <img
                                    alt="edit13218"
                                    src="/playground_assets/edit13218-9ibd-200h.png"
                                    className={styles['edit13']}
                                />
                                <img
                                    alt="close13218"
                                    src="/playground_assets/close13218-4857-200h.png"
                                    className={styles['close13']}
                                />
                            </div>
                        </div>
                        <div className={styles['frame28']}>
                            <div className={styles['frame29']}>
                                <div className={styles['frame30']}>
            <span className={styles['text33']}>
              <span>연구개발보고서 쓰기...</span>
            </span>
                                </div>
                                <div>
            <span className={styles['text35']}>
              <span>2021.09.24</span>
            </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['frame32']}>
                            <div className={styles['frame33']}>
          <span className={styles['text37']}>
            <span>중요한 Task로써 열심히 해야합ㄴ디ㅏ.</span>
          </span>
                            </div>
                        </div>
                        <div className={styles['frame34']}>
                            <img
                                alt="fire13235"
                                src="/playground_assets/fire13235-3abq-200w.png"
                                className={styles['fire13']}
                            />
                            <div className={styles['tag5']}>
          <span className={styles['text39']}>
            <span>뷰티</span>
          </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['frame21']} className={styles['frame21']}>
                    <div className={styles['framecontainer4']}>
                        <div className={styles['frameframe4']}>
                            <div className={styles['frame-state1']}>
                                <img
                                    alt="Ellipse73218"
                                    src="/playground_assets/ellipse73218-ypf-200h.png"
                                    className={styles['ellipse74']}
                                />
                                <img
                                    alt="Ellipse83218"
                                    src="/playground_assets/ellipse83218-71zc-200h.png"
                                    className={styles['ellipse84']}
                                />
                                <img
                                    alt="Ellipse93218"
                                    src="/playground_assets/ellipse93218-iy6u-200h.png"
                                    className={styles['ellipse94']}
                                />
                            </div>
                            <div className={styles['frame-button1']}>
                                <img
                                    alt="edit13218"
                                    src="/playground_assets/edit13218-9ibd-200h.png"
                                    className={styles['edit14']}
                                />
                                <img
                                    alt="close13218"
                                    src="/playground_assets/close13218-4857-200h.png"
                                    className={styles['close14']}
                                />
                            </div>
                        </div>
                        <div className={styles['frame35']}>
                            <div className={styles['frame36']}>
                                <div className={styles['frame37']}>
            <span className={styles['text41']}>
              <span>연구개발보고서 쓰기...</span>
            </span>
                                </div>
                                <div className={styles['frame38']}>
            <span className={styles['text43']}>
              <span>2021.09.24</span>
            </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['frame39']}>
                            <div className={styles['frame40']}>
          <span className={styles['text45']}>
            <span>중요한 Task로써 열심히 해야합ㄴ디ㅏ.</span>
          </span>
                            </div>
                        </div>
                        <div className={styles['frame41']}>
                            <img
                                alt="fire13235"
                                src="/playground_assets/fire13235-3abq-200w.png"
                                className={styles['fire14']}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['frame31']} className={styles['frame31']}>
                    <div className={styles['framecontainer5']}>
                        <div className={styles['frameframe5']}>
                            <div className={styles['frame42']}>
                                <img
                                    alt="Ellipse73218"
                                    src="/playground_assets/ellipse73218-ypf-200h.png"
                                    className={styles['ellipse75']}
                                />
                                <img
                                    alt="Ellipse83218"
                                    src="/playground_assets/ellipse83218-71zc-200h.png"
                                    className={styles['ellipse85']}
                                />
                                <img
                                    alt="Ellipse93218"
                                    src="/playground_assets/ellipse93218-iy6u-200h.png"
                                    className={styles['ellipse95']}
                                />
                            </div>
                            <div className={styles['frame43']}>
                                <img
                                    alt="edit13218"
                                    src="/playground_assets/edit13218-9ibd-200h.png"
                                    className={styles['edit15']}
                                />
                                <img
                                    alt="close13218"
                                    src="/playground_assets/close13218-4857-200h.png"
                                    className={styles['close15']}
                                />
                            </div>
                        </div>
                        <div className={styles['frame44']}>
                            <div className={styles['frame45']}>
                                <div className={styles['frame46']}>
            <span className={styles['text47']}>
              <span>연구개발보고서 쓰기...</span>
            </span>
                                </div>
                                <div className={styles['frame47']}>
            <span className={styles['text49']}>
              <span>2021.09.24</span>
            </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles['frame48']}>
                            <div className={styles['frame49']}>
          <span className={styles['text51']}>
            <span>중요한 Task로써 열심히 해야합ㄴ디ㅏ.</span>
          </span>
                            </div>
                        </div>
                        <div className={styles['frame50']}>
                            <img
                                alt="fire13235"
                                src="/playground_assets/fire13235-3abq-200w.png"
                                className={styles['fire15']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Main;
