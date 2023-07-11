import React from "react";
import './assets/css/App.module.css';
import styles from './assets/css/App.module.css'
// import Routes from "./route/Router.js";
import ApiUtil from "./api/api.util.js";

import {Outlet, RouterProvider} from 'react-router-dom';
import Header from "./component/Header";
import router from "./route/Router";
ApiUtil.init()
function App() {
  return (
      <div className={styles['frame0']}>
          <React.StrictMode>
              <RouterProvider router={router} />
          </React.StrictMode>,
      </div>
  );
}

export default App;
