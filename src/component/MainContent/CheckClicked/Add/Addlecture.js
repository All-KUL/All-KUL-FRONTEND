import React,{ useState,useEffect } from 'react';
import AddTable from './AddTable'
export default function Addlecture(){
  const [data, setData] = useState([
    {  id: "1234", name: "과목명", info: "분류", maxStudents: "인원" }
  ]);
  
    const columns = React.useMemo(
        () => [
          {
            Header: "과목번호",
            accessor: "id",
          },{
            Header: "교과목명",
            accessor: "name",
          },
          {
            Header: "개설학과",
            accessor: "info",
  
          },
          {
            Header: "수용인원",
            accessor: "maxStudents",
          },{
            Header: "추가",
            accessor: "add", // 삭제 버튼을 추가하려면 적절한 accessor를 지정해야 합니다.
          }
        ],
        []
      );
         
    return(
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
          width:"100%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <text style={{ fontWeight: "bold", marginTop: "10px", marginLeft: "10px" }}>과목 추가</text>
        <AddTable columns={columns} data={data} />


      </div>





        </div>
    );
}