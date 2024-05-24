import React, { useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const baseURL = process.env.REACT_APP_LECTURE_API; //base URL 설정

function AddTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  const lectureApiUrl = process.env.REACT_APP_LECTURE_API;

  // 각 열의 값을 저장하는 상태
  const [rowData, setRowData] = useState({});

  // 서버로 추가 요청을 보내는 함수

  const sendAddRequest = async () => {
    try {
      const queryString = Object.keys(rowData)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(rowData[key]))
        .join('&');

      const response = await axios.post(`${baseURL}/api/v1/lecture/addLecture`, queryString);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding lecture:', error);
    }
  };


  // 추가 버튼 클릭 시 추가 요청을 보내는 함수
  const handleAddButtonClick = () => {
    console.log(rowData);
    sendAddRequest();
    setRowData({});
    alert(`과목 추가 완료`);
  };

  // 입력된 텍스트를 가져오는 함수
  const getInputText = (rowIndex, columnId) => {
    const valueKey = `${columnId}`;
    return rowData[valueKey] || '';
  };

  // 셀 값 변경 핸들러
  const handleCellValueChange = (rowIndex, columnId, value) => {
    setRowData(prevState => ({
      ...prevState,
      [`${columnId}`]: value,
    }));
  };

  return (
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%', marginTop: "15px" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ fontSize: "10px", border: '1px solid #ddd', padding: '8px', textAlign: 'center', background: '#F2F2F2', minWidth: column.id === 'lectureTime' ? '150px' : 'auto', width: ['courseCode', 'delete', 'grade'].includes(column.id) ? 'px' : 'auto' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => {
                const { column } = cell;
                const valueKey = `${rowIndex}-${column.id}`;
                const cellValue = rowData[valueKey] || cell.value;

                return (
                  <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: "13px" }}>
                    {cellIndex === (row.cells.length - 1) ? (
                      <button style={{ backgroundColor: '#7AB85C', color: 'white', border: 'none', borderRadius: '5px', padding: '4px 8px', cursor: 'pointer' }} onClick={handleAddButtonClick}>추가</button>
                    ) : (
                      <input
                        type="text"
                        value={getInputText(rowIndex, column.id)}
                        onChange={e => handleCellValueChange(rowIndex, column.id, e.target.value)}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AddTable;
