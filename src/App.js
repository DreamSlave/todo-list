import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './assets/css/App.module.css';
import styles from './assets/css/App.module.css'
import First from "./views/First";
import Task from "./views/Task";
import Main from "./views/Main"; //모듈 스타일 import

import ApiUtil from "./api/api.util.js";
import Header from "./component/Header";
ApiUtil.init()
function App() {
  return (
      <div className={styles['frame0']}>
          <div className={styles['group16']}>
              <div className={styles['navi']}>
                  <Header />
              </div>
          </div>

        <BrowserRouter>
          <Routes>
            <Route path="/first" element={<First />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/task" element={<Task />}></Route>
          </Routes>
            <Link to="/first">FirstLayout</Link><br/><br/>
            <Link to="/main">MainLayout</Link><br/><br/>
            <Link to="/task">Task</Link>
        </BrowserRouter>
      </div>
  );
}

export default App;
