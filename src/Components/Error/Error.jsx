import React from "react";
import "./Error.css"; // CSS 파일 import

function Error() {
  return (
    <div className="error-container">
      <div className="error-message">
        테이블의 QR 코드를 찍어서 인증후 접속해주세요!
      </div>
    </div>
  );
}

export default Error;
