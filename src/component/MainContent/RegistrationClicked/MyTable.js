import React from 'react';
import { useTable } from 'react-table';

function MyTable({ columns, data, handleDelete }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%', marginTop: "15px" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ fontSize: "10px", border: '1px solid #ddd', padding: '8px', textAlign: 'center', background: '#F2F2F2', minWidth: column.id === 'lectureTime' ? '150px' : 'auto', width: ['id', 'delete', 'grade'].includes(column.id) ? '45px' : 'auto' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: "13px" }}>
                    {index === 1 ? (
                      <button onClick={() => handleDelete(row.index)}>삭제</button>
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

export default MyTable;
