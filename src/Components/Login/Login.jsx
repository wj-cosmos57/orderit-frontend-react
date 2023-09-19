import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/user";

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class Login extends Component {
  constructor() {
    super();
  }

  async doLogin(tableNo) {
    let loginRes = await login(tableNo);
    if (loginRes.statusCode == "SSU0000") {
      //server connection fail
      alert("서버와의 접속이 끊어졌습니다.");
    } else if (loginRes.statusCode == "SSU2010") {
      localStorage.clear();
      localStorage.setItem("accessToken", loginRes.data.accessToken);
      localStorage.setItem("tableNo", tableNo);
      this.props.navigate("/");
    } else {
      //기타 오류
      alert("접근 오류입니다.");
    }
  }

  componentDidMount() {
    let searchParams = new URLSearchParams(document.location.search);
    let tableNo = searchParams.get("tableNo");
    this.doLogin(tableNo);
  }

  render() {
    return <></>;
  }
}

export default withNavigation(Login);
