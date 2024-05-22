import React from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const baseURL = process.env.REACT_APP_LECTURE_API; //base URL 설정

function GetTable({ columns, data, handleDelete, fetchData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // 삭제 요청을 서버에 보내는 함수
  const sendDeleteRequest = async (id) => {
    try {
      await axios.delete(baseURL + `/api/v1/lecture/deleteLecture?id=${id}`);
      console.log(`Successfully deleted lecture with ID: ${id}`);
      // 삭제 성공 후 fetchData 함수 호출하여 데이터 다시 가져오기
      fetchData();
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteButtonClick = (id) => {
    console.log(`Deleting lecture with ID: ${id}`);
    alert('과목이 삭제되었습니다')
    sendDeleteRequest(id);
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

                return (
                  <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: "13px" }}>
                    {cellIndex === (row.cells.length - 1) ? (
                      <button style={{ backgroundColor: '#EF6171', color: 'white', border: 'none', borderRadius: '5px', padding: '4px 8px', cursor: 'pointer' }} onClick={() => handleDeleteButtonClick(row.original.id)}>삭제</button>
                    ) : (
                      cell.render('Cell')
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

export default GetTable;
