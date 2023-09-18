import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="overlay">
      <div className="loading_view">
        <img src="../../assets/Loading.gif"></img>
      </div>
    </div>
  );
}

export default Loading;
