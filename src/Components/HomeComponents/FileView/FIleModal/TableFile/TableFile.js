import React, { useState } from 'react';
import "./TableFile.css";
import dropdownImg from '../../../../../Assets/dropdwonImg.svg';
import { Menu, Dropdown } from "antd";

const TableFile = ({ data, onSort }) => {
  const [columnName, setcolumnName] = useState('');

  const handleSort = (column, order) => {

    onSort(column, order);
  };

  const itemsName = [
    {
      key: '1',
      label: 'A-Z',
      onClick: () => handleSort(columnName, 'A-Z'),
    },
    {
      key: '2',
      label: 'Z-A',
      onClick: () => handleSort(columnName, 'Z-A'),
    },
  ];


  const columns = Object.keys(data[0]);

  return (
    <div className="table-containers">
      <table className='table'>
        <thead className="tableHead">
          <tr>
            {columns.map((column, index) => (
              <th className="tableHeadTh" key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: "2vw" }}>
                  <p>{column}</p>
                  <Dropdown overlay={<Menu>{itemsName.map(item => (
                    <Menu.Item key={item.key} onClick={item.onClick}>
                      {item.label}
                    </Menu.Item>
                  ))}</Menu>}>
                    <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" onClick={() => setcolumnName(column)} />
                  </Dropdown>
                </div></th>
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
