// TableFile.js

import React from 'react';
import "./TableFile.css";

const TableFile = ({ data }) => {
  const columns = Object.keys(data[0]);

  return (
    <div className="table-container">
      <table className='table'>
        <thead className="tableHead">
          <tr>
            {columns.map((column, index) => (
              <th className="tableHeadTh" key={index}><p>{column}</p></th>
            ))}
          </tr>
        </thead>
        <tbody className='tableBody'>
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="tableBodyTd" ><p>{rowData[column]}</p></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableFile;
