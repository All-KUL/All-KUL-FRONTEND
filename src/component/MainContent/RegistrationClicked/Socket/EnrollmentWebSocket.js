import React, { useEffect, useState, useRef } from 'react';

const SOCKET_URL = 'ws://127.0.0.1:8081';
//해야할 것: localstorage 써서 강의 저장 & 불러오기
//저장된 강의는 callData를 통해 유저가 수강신청 성공한 강의를 보여주고, remove 가능하게?(이건나중에선택사항)
//이미 수강된 강의를 입력하면 "이미 수강신청된 강의입니다" 메세지 띄우기

const EnrollmentWebSocket = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [lectureId, setLectureId] = useState('');
    const [enrollTime, setEnrollTime] = useState('');
    const websocket = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        websocket.current = new WebSocket(SOCKET_URL);

        // Define WebSocket event handlers
        websocket.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        websocket.current.onmessage = (event) => {
            const message = event.data;
            setMessages((prev) => [...prev, message]);
        };

        websocket.current.onclose = (event) => {
            console.log('WebSocket disconnected', event);
            setIsConnected(false);
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup function to close WebSocket when component unmounts
        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, []);

    const handleSendMessage = (command, data) => {
        const message = `[${command}]${data}`;
        if (websocket.current && isConnected) {
            websocket.current.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    };

    const handleAddLecture = () => {
        // Add Lecture 버튼 클릭 시 lectureId 상태 초기화
        setLectureId('');
        handleSendMessage('addLecture', lectureId);
    };

    const handleDeleteLecture = () => {
        // Delete Lecture 버튼 클릭 시 lectureId 상태 초기화
        setLectureId('');
        handleSendMessage('deleteLecture', lectureId);
    };

    const handleEnroll = () => {
        // Enroll 버튼 클릭 시 lectureId 상태 초기화
        setLectureId('');
        handleSendMessage('enroll', lectureId);
    };

    return (
        <div>
            <h2>Enrollment WebSocket</h2>
            <div>
                <input
                    type="text"
                    value={enrollTime}
                    onChange={(e) => setEnrollTime(e.target.value)}
                    placeholder="YYYY.MM.DD-HH:MM"
                />
                <button onClick={() => handleSendMessage('setEnrollTime', enrollTime)} disabled={!isConnected}>
                    Set Enroll Time
                </button>
                <input
                    type="text"
                    value={lectureId}
                    onChange={(e) => setLectureId(e.target.value)}
                    placeholder="과목번호 (4자리)"
                />
                <button onClick={handleAddLecture} disabled={!isConnected || !lectureId}>
                    Add Lecture
                </button>
                <button onClick={handleDeleteLecture} disabled={!isConnected || !lectureId}>
                    Delete Lecture
                </button>
                <button onClick={handleEnroll} disabled={!isConnected || !lectureId}>
                    Enroll
                </button>
                <button onClick={() => handleSendMessage('serverTime', '')} disabled={!isConnected}>
                    Get Server Time
                </button>
            </div>
            <div>
                <h3>Messages</h3>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
            {!isConnected && <p>WebSocket is not connected.</p>}
        </div>
    );
};

export default EnrollmentWebSocket;
