import React from 'react';
import './previewdownload.css';
import dropdownImg from '../../../../../Assets/dropdwonImg.svg';
import { Dropdown } from "antd";

const PreviewDownload = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const items = [
    {
      key: '1',
      label: <button >{'('}A to Z {')'} </button>,

    },
    {
      key: '2',
      label: <button >{'('}Z to A {')'} </button>,

    },

  ];

  // const itemsDate = [
  //   {
  //     key: '1',
  //     label: <button >{'('}A to Z {')'} </button>,

  //   },
  //   {
  //     key: '2',
  //     label: <button >{'('}Z to A {')'} </button>,

  //   },

  // ];

  return (
    <div className="table-container">
      <table className="table-container_table">
        <thead className="table-container_table_thead">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-container_table_th">
                {header}
                <Dropdown menu={{
                  items,
                }}
                  trigger={['click']}
                >
                  <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
                </Dropdown>

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
