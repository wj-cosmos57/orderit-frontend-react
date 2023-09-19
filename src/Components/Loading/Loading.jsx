import React, { useEffect } from "react";
import "./Loading.css";
import logo from "../../assets/Loading.gif";

function Loading({ overlayHeight }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Loading 컴포넌트가 마운트될 때 스크롤을 막습니다.

    return () => {
      document.body.style.overflow = "auto"; // Loading 컴포넌트가 언마운트될 때 스크롤을 허용합니다.
    };
  }, []);
  return (
    <div className="overlay" style={{ height: `${overlayHeight}px` }}>
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
