import React, { useState, useEffect } from "react";
import webSocketClient from "../../../WebSocket";

const EnrollmentPage = () => {
  const [lectureId, setLectureId] = useState("");
  const [enrollTime, setEnrollTime] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(""); // 세션 ID 상태 추가

  const initEnrollment = () => {
    webSocketClient.username = name;
    webSocketClient.connect();
  };

  const joinSession = () => {
    if (
      sessionId.trim() !== "" &&
      name.trim() !== "" &&
      webSocketClient.isConnected
    ) {
      const data = JSON.stringify({
        type: "joinClient",
        data: `${sessionId}|${name}`,
      });
      webSocketClient.websocket.send(data);
    }
  };

  const handleAddLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      const data = JSON.stringify({ type: "addLecture", data: lectureId });
      webSocketClient.websocket.send(data);
    }
  };

  const handleDeleteLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      const data = JSON.stringify({ type: "deleteLecture", data: lectureId });
      webSocketClient.websocket.send(data);
    }
  };

  const handleEnroll = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      const data = JSON.stringify({ type: "enroll", data: lectureId });
      console.log("Sending enroll message:", data); // 로그 추가
      webSocketClient.websocket.send(data);
    }
  };

  const handleSetTime = () => {
    if (enrollTime.trim() !== "" && webSocketClient.isConnected) {
      const data = JSON.stringify({ type: "setEnrollTime", data: enrollTime });
      webSocketClient.websocket.send(data);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const data = JSON.stringify({ type: "chat", data: message });
      webSocketClient.websocket.send(data);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Enrollment Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <button onClick={initEnrollment}>Init Enrollment</button>
        <input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="Session ID"
        />
        <button onClick={joinSession} disabled={!webSocketClient.isConnected}>
          Join Session
        </button>
        <input
          type="text"
          value={enrollTime}
          onChange={(e) => setEnrollTime(e.target.value)}
          placeholder="YYYY.MM.DD-HH:MM"
        />
        <button onClick={handleSetTime} disabled={!webSocketClient.isConnected}>
          Set Enroll Time
        </button>
        <input
          type="text"
          value={lectureId}
          onChange={(e) => setLectureId(e.target.value)}
          placeholder="Course ID (4 digits)"
        />
        <button
          onClick={handleAddLecture}
          disabled={!webSocketClient.isConnected || !lectureId}
        >
          Add Lecture
        </button>
        <button
          onClick={handleDeleteLecture}
          disabled={!webSocketClient.isConnected || !lectureId}
        >
          Delete Lecture
        </button>
        <button
          onClick={handleEnroll}
          disabled={!webSocketClient.isConnected || !lectureId}
        >
          Enroll
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button
          onClick={sendMessage}
          disabled={!webSocketClient.isConnected || !message.trim()}
        >
          Send
        </button>
        <div>
          {chatHistory.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
