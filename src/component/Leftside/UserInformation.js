import React, { useState, useEffect } from "react";
import HorizonLine from "../horizontal";
import webSocketClient from "../WebSocket";

export default function UserInfo() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      webSocketClient.websocket.send("[chat]" + message);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        display: "block",
        width: "256px",
        height: "440px",
        border: "1px solid #70BB53",
        marginTop: "13px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ padding: "10px" }}>
        <span style={{ fontSize: "13px" }}>채팅</span>
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "10px",
            padding: "5px",
          }}
        >
          <div>채팅</div>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          style={{ width: "80%", marginTop: "10px", padding: "5px" }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: "18%",
            marginTop: "10px",
            marginLeft: "2%",
            padding: "5px",
          }}
        >
          전송
        </button>
      </div>
      <HorizonLine />
    </div>
  );
}
