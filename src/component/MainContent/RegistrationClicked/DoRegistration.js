import React, { useEffect, useState } from "react";
import MyTable from "./MyTable"; // MyTable 컴포넌트의 경로를 정확히 설정해야 합니다.

export default function DoRegistration({inputText}) {
  // 기존 데이터 배열을 localStorage에서 불러오거나 없으면 빈 배열을 사용
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("registrationData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleDelete = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1); // 해당 인덱스의 행을 삭제
    // 남은 데이터의 ID를 재설정
    newData.forEach((item, index) => {
      item.id = index + 1;
    });
    setData(newData);
  };

  // 새로운 과목 추가 함수
  const addSubject = () => {
    if (inputText.length === 4) {
      const newData = [
        ...data,
        {
          id: data.length + 1, // 현재 데이터 개수 + 1 로 ID 설정
          courseCode: inputText,
          instructor: "New Instructor",
          credits: 3,
          // 필요한 경우 기본 값으로 설정 가능
        },
      ];
      setData(newData);
    }
  };

  useEffect(() => {
    addSubject();
  }, [inputText]); // inputText가 변경될 때마다 addSubject 함수 호출

  // data가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(data));
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "삭제",
        accessor: "delete", // 삭제 버튼을 추가하려면 적절한 accessor를 지정해야 합니다.
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <text style={{ fontWeight: "bold", marginTop: "10px", marginLeft: "10px" }}>수강신청 내역</text>
        <MyTable columns={columns} data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
