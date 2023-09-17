import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login";
import Menudetail from "./Components/Menudetail/Menudetail";
import Order from "./Components/Order/Order";
import Mainpage from "./Components/Mainpage/Mainpage";
import Error from "./Components/Error/Error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />

      <Route path="/menu/:menuId" element={<Menudetail />} />
      <Route path="/order" element={<Order />} />

      <Route path="/login" element={<Login />} />
      <Route path="error" element={<Error />} />
    </Routes>
  );
}

export default App;
