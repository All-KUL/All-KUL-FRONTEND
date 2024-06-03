/* import React, { useState, useEffect } from "react";
import webSocketClient from "../../WebSocket";

export default function CourseCheck({ setLectureList }) {
  const [lectureId, setLectureId] = useState("");
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    setLectureList(lectures);
  }, [lectures, setLectureList]);

  const handleAddLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      webSocketClient.websocket.send("[addLecture]" + lectureId);
      setLectures((prevLectures) => [...prevLectures, lectureId]);
    }
  };

  const handleDeleteLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      webSocketClient.websocket.send("[deleteLecture]" + lectureId);
      setLectures((prevLectures) => prevLectures.filter((id) => id !== lectureId));
    }
  };

  return (
    <div style={{ marginLeft: "312px" }}>
      <h2>개설과목 조회</h2>
      <input
        type="text"
        value={lectureId}
        onChange={(e) => setLectureId(e.target.value)}
        placeholder="Course ID (4 digits)"
        style={{
          outlineColor: "#ECECEC",
          height: "20px",
          width: "150px",
          borderRadius: "3px",
          border: "2px solid #ECECEC",
          marginRight: "5px",
        }}
      />
      <button
        onClick={handleAddLecture}
        disabled={!webSocketClient.isConnected || !lectureId}
        style={{
          backgroundColor: "#4BAB26",
          height: "24px",
          width: "100px",
          marginLeft: "5px",
          color: "#FFFFFF",
          borderRadius: "3px",
          cursor: "grab",
        }}
      >
        Add
      </button>
      <button
        onClick={handleDeleteLecture}
        disabled={!webSocketClient.isConnected || !lectureId}
        style={{
          backgroundColor: "#D32F2F",
          height: "24px",
          width: "100px",
          marginLeft: "5px",
          color: "#FFFFFF",
          borderRadius: "3px",
          cursor: "grab",
        }}
      >
        Delete
      </button>
    </div>
  );
}
 */