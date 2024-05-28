import { useState } from "react";
import DoNotice from "./DoNotice";
import "../../../index.css";
export default function NoticeClicked() {
  const baseURL = process.env.REACT_APP_LECTURE_API; //base URL 설정

  const [buttonName, setButtonName] = useState("Login");
  const [code, setCode] = useState(""); // code 상태를 useState로 관리
  const [inputText, setInputText] = useState("");

  const handleButtonClick = (buttonName) => {
    setButtonName(buttonName);
  };

  const activeButton = () => {
    if (inputText.length === 4) {
      alert(`${inputText} 추가 완료`);
      setCode(inputText);
    } else {
      alert("잘못된 입렵 값입니다.");
    }
    setInputText(""); // 입력 상태 초기화
  };
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      activeButton();
      e.target.value = ""; // 입력값 초기화
    }
  };
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

      <DoNotice activeComponent={buttonName} />
    </div>
  );
}
