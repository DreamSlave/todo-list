import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.module.css';
import styles from './App.module.css'
import First from "./First";
import Task from "./Task";
import Main from "./Main"; //모듈 스타일 import


function App() {
  return (
      <div>

        <BrowserRouter>
          <Routes>
            <Route path="/first" element={<First />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/task" element={<Task />}></Route>
          </Routes>
            <Link to="/first">FirstLayout</Link>
            <Link to="/main">MainLayout</Link>
            <Link to="/task">Task</Link>
        </BrowserRouter>
      </div>
  );
}

export default App;
