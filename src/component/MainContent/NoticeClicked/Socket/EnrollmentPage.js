import React, { useState, useEffect } from "react";
import webSocketClient from "../../../WebSocket";
import copy from "copy-to-clipboard";
import styled from "styled-components";

const EnrollmentPage = () => {
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      webSocketClient.websocket.send("[chat]" + message);
      setMessage("");
    }
  };
  
  const [chatMessage, setChatMessage] = useState(() => {
  
  
  // 로컬 스토리지에서 채팅 메시지 불러오기: 
    const savedChatMessage = localStorage.getItem("chatMessage");
    return savedChatMessage ? JSON.parse(savedChatMessage) : [];
  });

  
  useEffect(() => {
    webSocketClient.setOnMessageCallback((data) => {
      const parts = data.split("]");
      if (parts.length > 1 && parts[1].includes("create")) {
        const messageContent = parts[2].trim();
        setChatHistory((prev) => [...prev, messageContent]);
      } else if (parts.length > 1 && parts[1].includes("chat")) {
        setChatMessage((prev) => {
          const newMessages = [...prev, data];
          // 로컬 스토리지에 채팅 메시지 저장
          localStorage.setItem("chatMessage", JSON.stringify(newMessages));
          return newMessages;
        });
      }
    });
  }, []);

  const joinSession = () => {
    webSocketClient.connect(() => {
      webSocketClient.websocket.send("[joinClient]" + sessionId + "," + name);
      setShowChat(true);
      setChatHistory([]);
    });
  };

  const joinSession2 = () => {
    webSocketClient.username = name;
    webSocketClient.connect(() => {
      webSocketClient.websocket.send("[joinClient]" + sessionId + "," + name);
      setShowChat(false);
    });
    alert("입장했습니다~ 올클 연습 가보자고!!");
    setSessionId("");
  };

  const handleCopy = (msg) => {
    copy(msg);
    alert("메시지가 클립보드에 복사되었습니다!");
  };

  return (
    <Container>
      <Heading>* 로그인 방법 안내 *</Heading>
      <SubHeading>1. 새로운 방을 만들고 싶다면?</SubHeading>
      <Instructions>
        <Instruction>(1) 이름 입력 후 방 만들기 클릭</Instruction>
        <Instruction>(2) 생성된 코드 입력 후 입장하기 클릭</Instruction>
        <Instruction>(3) 복사한 코드는 친구들에게 보내주기~</Instruction>
      </Instructions>

      <SubHeading2>2. 기존 방에 입장하고 싶다면?</SubHeading2>
      <Instructions>
        <Instruction>(1) 이름과 코드 입력 후 입장하기 클릭</Instruction>
      </Instructions>

      <InputContainer>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요."
        />
        <Button onClick={joinSession}>방만들기</Button>
      </InputContainer>

      
      <InputContainer>
        <Input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="Session ID"
        />
        <Button2 onClick={joinSession2}>입장하기</Button2>
       
      </InputContainer>
  
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubHeading = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  background: #ffff80;
`;

const SubHeading2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  background: #80caff;
`;

const Instructions = styled.div`
  margin-bottom: 20px;
`;

const Instruction = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ffff80;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Button2 = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #80caff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ChatHistoryContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const ChatMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CopyButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background-color: #ffff80;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default EnrollmentPage;
