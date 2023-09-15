import React from 'react';
import './previewdownload.css';
import dropdownImg from '../../../../../Assets/dropdwonImg.svg';

const PreviewDownload = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="table-container">
      <table className="table-container_table">
        <thead className="table-container_table_thead">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-container_table_th">
                {header}
                <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-container_table_tbody">
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header, index) => (
                <td key={index} className="table-container_table_td">{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviewDownload;
