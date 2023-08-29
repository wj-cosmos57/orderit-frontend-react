import React from 'react';
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Mainpage from './Mainpage'
import Menudetail from './Menudetail';

function App() {

  return (
    <div style={{backgroundColor: "gray"}}>
      <div style={{width: 500, backgroundColor: "white"}}>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/:menuId" element={<Menudetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;