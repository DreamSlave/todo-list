import React from "react";
import './assets/css/App.module.css';
import styles from './assets/css/App.module.css'
// import Routes from "./route/Router.js";
import ApiUtil from "./api/api.util.js";
import {Outlet, RouterProvider} from 'react-router-dom';
import router from "./route/Router";
ApiUtil.init()
function App() {
  return (
      <div className={styles['frame0']}>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
