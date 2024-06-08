import React, { useState, useEffect } from "react";
import HorizonLine from "../horizontal";
import webSocketClient from "../WebSocket";
import styled from "styled-components";

export default function UserInfo() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    // 로컬 스토리지에서 채팅 메시지 불러오기
    const savedChatMessage = localStorage.getItem("chatHistory");
    return savedChatMessage ? JSON.parse(savedChatMessage) : [];
  });

  const sendMessage = () => {
    if (message.trim() !== "") {
      //여기서 대신 아이디
      const newMessage = "[chat]" + message;
      webSocketClient.websocket.send(newMessage);
      setMessage("");
      setChatHistory((prev) => {
        const updatedHistory = [...prev, newMessage];
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  };

  useEffect(() => {
    webSocketClient.setOnMessageCallback((data) => {
      setChatHistory((prev) => {
        const newMessages = [...prev, data];
        localStorage.setItem("chatHistory", JSON.stringify(newMessages));
        return newMessages;
      });
    });
  }, [chatHistory]);

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
          {chatHistory
            .filter((msg) => !msg.startsWith("[chat]")) // [chat]으로 시작하는 메시지 필터링
            .map((msg, index) => (
              <ChatMessage key={index}>{msg}</ChatMessage>
            ))}
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

const ChatMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
