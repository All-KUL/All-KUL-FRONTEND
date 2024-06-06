import React, { useState, useEffect } from "react";
import webSocketClient from "../../../WebSocket";

const EnrollmentPage = () => {
  const [lectureId, setLectureId] = useState("");
  const [enrollTime, setEnrollTime] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const initEnrollment = () => {
    webSocketClient.username = name;
    webSocketClient.connect();
  };

  const handleAddLecture = () => {
    webSocketClient.sendMessage("addLecture", lectureId);
  };

  const handleEnroll = () => {
    webSocketClient.sendMessage("enroll", lectureId);
  };

  const handleDeleteLecture = () => {
    webSocketClient.sendMessage("deleteLecture", lectureId);
  };

  const handleSetTime = () => {
    webSocketClient.sendMessage("setEnrollTime", enrollTime);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      webSocketClient.sendMessage("chat", message);
      setMessage("");
    }
  };

  // useEffect(() => {
  //     if (webSocketClient.isConnected) {
  //         webSocketClient.websocket.onmessage = (event) => {
  //             const data = JSON.parse(event.data);
  //             if (data.type === 'chat') {
  //                 setChatHistory(prev => [...prev, data.message]);
  //             }
  //         };
  //     }
  // }, [webSocketClient.isConnected]);

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