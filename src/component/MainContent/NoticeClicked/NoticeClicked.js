import React, { useState, useEffect } from "react";
import "../../../index.css";
import Login from "./Login";
import Manual from "./Manual";

export default function NoticeClicked() {
  const baseURL = process.env.REACT_APP_LECTURE_API; //base URL 설정

  const [buttonName, setButtonName] = useState("Login");

  const handleButtonClick = (buttonName) => {
    setButtonName(buttonName);
  };

  useEffect(() => {
    console.log('Active component:', buttonName);
  }, [buttonName]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          className="select_button_Container"
          onClick={() => handleButtonClick("Login")}
          style={{
            marginLeft: "312px",
            cursor: "pointer",
            fontSize: "13px",
            color: buttonName === "Login" ? "#FFFFFF" : "black",
            backgroundColor: buttonName === "Login" ? "#4BAB26" : "#F5F5F5",
          }}
        >
          로그인
        </button>

        <button
          className="select_button_Container"
          onClick={() => handleButtonClick("Manual")}
          style={{
            marginLeft: "2px",
            cursor: "pointer", // 클릭시 글자색 흰색
            fontSize: "13px",
            color: buttonName === "Manual" ? "#FFFFFF" : "black",
            backgroundColor: buttonName === "Manual" ? "#4BAB26" : "#F5F5F5",
          }}
        >
          시스템 이용법
        </button>
      </div>
      <div
        style={{
          borderBottom: "1px solid black",
          lineHeight: "0.1em",
          width: "1180px",
          marginLeft: "312px",
        }}
      />

      <div>
        {buttonName === 'Login' && <Login />}
        {buttonName === 'Manual' && <Manual />}
      </div>
    </div>
  );
}
