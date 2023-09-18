import React from "react";
import "./Loading.css";
import logo from "../../assets/Loading.gif";

function Loading() {
  return (
    <div className="overlay">
      <div className="loading_view">
        <img
          src={logo}
          style={{ width: "50px", height: "50px" }}
          alt="loading..."
        />
      </div>
    </div>
  );
}

export default Loading;
