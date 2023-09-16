import React from 'react';
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Mainpage from './Mainpage'
import Login from './Login';
import Menudetail from './Menudetail';
import Order from './Order';

function App() {

  return (
        <Routes>
          <Route path="/" element={<Mainpage />} />

          <Route path="/menu/:menuId" element={<Menudetail />} />
          <Route path="/order" element={<Order />} />

          <Route path="/login" element={<Login />} />

        </Routes>
  )
}

export default App;