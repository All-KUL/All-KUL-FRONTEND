import React, { useState, useEffect } from 'react';
import GetTable from './GetTable';
import axios from 'axios';

export default function Getlecture() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const lectureApiUrl = process.env.REACT_APP_LECTURE_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/lecture/getAllLecture`);
        setData(response.data.object); // object 키에 해당하는 배열을 참조
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [lectureApiUrl]);
 
  const handleDelete = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const activeButton = () => {
    if (inputText.length === 4) {
      alert(`${inputText} 추가 완료`);
    } else {
      alert("잘못된 입력 값입니다.");
    }
    setInputText("");
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      activeButton();
      e.target.value = "";
    }
  }

  const columns = React.useMemo(
    () => [
      { Header: "과목번호", accessor: "id" },
      { Header: "교과목명", accessor: "name" },
      { Header: "개설 학과", accessor: "info" },
      { Header: "수용인원", accessor: "maxStudents" },
      { Header: "삭제", accessor: "delete" },
    ],
    []
  );

  return (
    <div>
      <div style={{ display: "flex", marginLeft: "312px" }}>
        <button style={{ backgroundColor: "#3BAAB5", border: "0px", height: "15px", marginTop: "13px" }} />
        <text style={{ fontWeight: "bold", marginTop: "10px", marginLeft: "10px", width: "100px" }}>과목 조회</text>
        <text style={{ fontSize: "13px", fontWeight: "bold", marginTop: "12px", marginLeft: "754px", whiteSpace: "nowrap" }}>개별과목조회</text>
        <input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => activeEnter(e)}
          placeholder="과목번호 (4자리)"
          value={inputText}
          style={{
            outlineColor: "#ECECEC",
            height: "20px",
            width: "150px",
            marginTop: "10px",
            marginLeft: "5px",
            borderRadius: "3px",
            border: "2px solid #ECECEC",
          }}
        />
        <button
          onClick={activeButton}
          style={{
            backgroundColor: "#005128",
            height: "24px",
            width: "60px",
            marginTop: "10px",
            marginLeft: "5px",
            color: "#FFFFFF",
            borderRadius: "3px",
            cursor: "grab"
          }}
        >
          신청
        </button>
      </div>

      <div style={{ marginLeft: "312px", width: "79%", display: "flex", flexDirection: "column" }}>
        <GetTable columns={columns} data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
