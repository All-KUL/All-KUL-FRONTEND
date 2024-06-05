import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Flatpickr 테마
import webSocketClient from "../../WebSocket";
import MyTable from "./MyTable";
import axios from "axios";

export default function DoRegistration() {
  const [code, setCode] = useState("");
  const [inputText, setInputText] = useState("");
  const [enrollTime, setEnrollTime] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("registrationData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [lectureList, setLectureList] = useState([]);
  const [lectureId, setLectureId] = useState("");
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    setLectureList(lectures);
  }, [lectures]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      const data =
        typeof event.data === "string" ? event.data : String(event.data);

      const parts = data.split("]");
      if (parts.length > 1 && parts[1].includes("success")) {
        alert("수강신청에 성공했습니다!");
        const lectureNameMatch = data.match(/<(.+)>/);
        if (lectureNameMatch) {
          const lectureName = lectureNameMatch[1].trim();
          addSubject(lectureName);
        }
      } else if (parts.length > 1 && parts[1].includes("fail")) {
        const failMessage = data.split("[fail] ")[1].trim();
        alert(failMessage);
      } else if (parts.length > 2 && parts[1].includes("addLecture")) {
        if (parts[2].includes("success")) {
          alert("과목이 개설되었습니다.");
          const lectureNameMatch = data.match(/<(.+)>/);
          if (lectureNameMatch) {
            const lectureName = lectureNameMatch[1].trim();
            setLectures((prevLectures) => [...prevLectures, lectureName]);
          }
        } else {
          alert("강의가 개설과목 목록에 존재하지 않습니다!");
        }
      } else if (parts.length > 2 && parts[1].includes("deleteLecture")) {
        if (parts[2].includes("success")) {
          alert("과목이 삭제되었습니다.");
          const lectureName = data.match(/<(.+)>/)[1]; // 메시지에서 강의 이름 추출
          setLectures((prevLectures) =>
            prevLectures.filter((id) => id !== lectureName)
          );
        }
      } else if (parts.length > 2 && parts[2].includes("fail")) {
        alert("강의가 세션에 존재하지 않습니다!");
      }
    };

    if (webSocketClient.websocket) {
      webSocketClient.websocket.addEventListener(
        "message",
        handleWebSocketMessage
      );
    }

    return () => {
      if (webSocketClient.websocket) {
        webSocketClient.websocket.removeEventListener(
          "message",
          handleWebSocketMessage
        );
      }
    };
  }, [code]);

  const handleSetTime = () => {
    if (enrollTime.trim() !== "" && webSocketClient.isConnected) {
      webSocketClient.websocket.send("[setEnrollTime]" + enrollTime);
    }
  };

  const handleDelete = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    newData.forEach((item, index) => {
      item.id = index + 1;
    });
    setData(newData);
  };

  const addSubject = (lectureName) => {
    // 이미 추가된 강의인지 확인
    const isAlreadyAdded = data.some(
      (item) => item.subjectName === lectureName
    );
    if (isAlreadyAdded) {
      alert("이미 신청한 강의입니다!");
      return;
    }

    const newData = [
      ...data,
      {
        id: data.length + 1,
        courseCode: code,
        subjectName: lectureName,
        instructor: "New Instructor",
        credits: 3,
      },
    ];
    setData(newData);
  };

  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(data));
  }, [data]);

  const handleEnroll = () => {
    if (inputText.trim() !== "" && webSocketClient.isConnected) {
      // 이미 신청한 강의인지 확인
      const isAlreadyEnrolled = data.some(
        (item) => item.courseCode === inputText
      );
      if (isAlreadyEnrolled) {
        alert("이미 신청한 강의입니다!");
        return;
      }

      webSocketClient.websocket.send("[enroll]" + inputText);
      setCode(inputText);
    } else {
      alert("잘못된 입력 값입니다.");
    }
    setInputText("");
  };

  const handleAddLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      webSocketClient.websocket.send("[addLecture]" + lectureId);
    }
  };

  const handleDeleteLecture = () => {
    if (lectureId.trim() !== "" && webSocketClient.isConnected) {
      webSocketClient.websocket.send("[deleteLecture]" + lectureId);
      setLectures((prevLectures) =>
        prevLectures.filter((id) => id !== lectureId)
      );
    }
  };

  const lectureColumns = React.useMemo(
    () => [
      {
        Header: "Course ID",
        accessor: "courseId",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "삭제",
        accessor: "delete",
      },
      {
        Header: "학년",
        accessor: "grade",
      },
      {
        Header: "이수구분",
        accessor: "classification",
      },
      {
        Header: "과목번호",
        accessor: "courseCode",
      },
      {
        Header: "교과목명",
        accessor: "subjectName",
      },
      {
        Header: "학점",
        accessor: "credits",
      },
      {
        Header: "시간",
        accessor: "time",
      },
      {
        Header: "강의시간",
        accessor: "lectureTime",
      },
      {
        Header: "담당교수",
        accessor: "professor",
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <div style={{ display: "flex", marginLeft: "312px" }}>
          <button
            style={{
              backgroundColor: "#3BAAB5",
              border: "0px",
              height: "15px",
              marginTop: "13px",
            }}
          ></button>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              과목 개설 & 시간 설정
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
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
          </div>
        </div>

        <div style={{ marginLeft: "312px", marginTop: "20px", width: "30%" }}>
          <MyTable
            columns={lectureColumns}
            data={lectures.map((id) => ({ courseId: id }))}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            alignItems: "center",
            marginLeft: "312px",
            marginTop: "20px",
          }}
        >
          <Flatpickr
            data-enable-time
            value={enrollTime}
            onChange={(selectedDates) => {
              const date = selectedDates[0];
              const formattedDate = `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${("0" + date.getDate()).slice(-2)}-${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
              setEnrollTime(formattedDate);
            }}
            options={{
              enableTime: true,
              dateFormat: "Y-m-d H:i",
            }}
            style={{
              outlineColor: "#ECECEC",
              height: "20px",
              width: "150px",
              borderRadius: "3px",
              border: "2px solid #ECECEC",
            }}
          />
          <button
            onClick={handleSetTime}
            disabled={!webSocketClient.isConnected}
            style={{
              backgroundColor: "#005128",
              height: "24px",
              width: "100px",
              marginLeft: "5px",
              color: "#FFFFFF",
              borderRadius: "3px",
              cursor: "grab",
            }}
          >
            시간 설정
          </button>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              marginLeft: "20px",
              whiteSpace: "nowrap",
            }}
          >
            빠른수강신청
          </span>
          <input
            type="text"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnroll();
                e.target.value = "";
              }
            }}
            placeholder="과목번호 (4자리)"
            value={inputText}
            style={{
              outlineColor: "#ECECEC",
              height: "20px",
              width: "150px",
              marginLeft: "5px",
              borderRadius: "3px",
              border: "2px solid #ECECEC",
            }}
          />
          <button
            onClick={handleEnroll}
            style={{
              backgroundColor: "#005128",
              height: "24px",
              width: "60px",
              marginLeft: "5px",
              color: "#FFFFFF",
              borderRadius: "3px",
              cursor: "grab",
            }}
          >
            신청
          </button>
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            lineHeight: "0.1em",
            width: "1180px",
            marginLeft: "312px",
            marginTop: "10px",
          }}
        />
        <div style={{ display: "flex", marginLeft: "312px" }}>
          <button
            style={{
              backgroundColor: "#3BAAB5",
              border: "0px",
              height: "15px",
              marginTop: "13px",
            }}
          ></button>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              수강신청 내역
            </span>
            <MyTable
              columns={columns}
              data={data}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
