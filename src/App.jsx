import React from 'react';
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Mainpage from './Mainpage'
import Menudetail from './Menudetail';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/:menuId" element={<Menudetail />} />
        </Routes>
  )
}

export default App;