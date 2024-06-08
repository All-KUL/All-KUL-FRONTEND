/* import React, { useState, useEffect } from "react";
import EnrollmentPage from "./EnrollmentPage";
import UserInfo from "./UserInfo";
import webSocketClient from "../WebSocketClient";

const ChatContainer = () => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    webSocketClient.setOnMessageCallback((data) => {
      const parts = data.split("]");
      if (
        parts.length > 1 &&
        (parts[1].includes("create") || parts[1].includes("chat"))
      ) {
        const messageContent = parts[2].trim();
        setChatMessages((prev) => [...prev, messageContent]);
      }
    });
  }, []);

  const addMessage = (message) => {
    setChatMessages((prev) => [...prev, message]);
  };

  return (
    <div>
      <EnrollmentPage chatMessages={chatMessages} addMessage={addMessage} />
      <UserInfo addMessage={addMessage} />
    </div>
  );
};

export default ChatContainer;
 */