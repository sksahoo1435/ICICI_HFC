import React, { useEffect, useState } from "react";
import "./FileDictionary.css";
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import downArrow from "../../../Assets/Union 2.svg";
import { Collapse } from "antd";
import { Dropdown } from "antd";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";
import Papa from 'papaparse';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const FileDictionary = () => {

  const [datas, setDatas] = useState([]);

  const [filesName, setFilesName] = useState([]);
  const [fileChildren, setFileChildren] = useState({});
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [selectedParentFolder, setSelectedParentFolder] = useState(null);
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(1)

  const getFilesName = async () => {
    try {
      const apiToFetch = `https://localhost:7062/api/Admin/GetFileNamesForDictionarys`;
      const response = await axios.get(apiToFetch, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFilesName(response.data);
      } else {
        console.log("Something went wrong", response);
      }

    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  useEffect(() => {
    getFilesName();
  }, []);

  const loadFileChildren = async (fileName) => {
    try {
      const apiToFetchChildren = `https://localhost:7062/api/Admin/GetColumnNamesByTableName/${fileName}`;
      const response = await axios.get(apiToFetchChildren, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFileChildren((prevFileChildren) => ({
          ...prevFileChildren,
          [fileName]: response.data,
        }));
      } else {
        console.log("Something went wrong", response);
      }
    } catch (error) {
      console.error('Error fetching children data from API:', error);
    }
  }

  const handleCheckboxChange = (tableName, fileName, index) => {
    const checkboxKey = `${fileName}`;

    if (checkedCheckboxes[checkboxKey]) {
      const updatedCheckboxes = { ...checkedCheckboxes };
      delete updatedCheckboxes[checkboxKey];
      setCheckedCheckboxes(updatedCheckboxes);
    } else {
      setCheckedCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [checkboxKey]: tableName,
      }));
      setSelectedParentFolder(tableName);
    }
  }

  const tableToShow = async (tableName, filesName) => {

    const result = Object.values(filesName).map(value => {
      const parts = value.split('-');
      return parts[1];
    });

    const tableResult = tableName.split('-')
    const tabletoSend = tableResult[0]

    try {

      const baseUrl = `https://localhost:7062/api/Admin/GetColumnData`;
      const columnNamesParams = [];
      for (const columnName of result) {
        columnNamesParams.push(`ColumnNames=${columnName}`);
      }
      const columnNamesQueryString = columnNamesParams.join('&');
      const apiUrl = `${baseUrl}?TableName=${tabletoSend}&${columnNamesQueryString}&Page=${page}&PageSize=100`;

      const response = await axios.get(apiUrl, {
        withCredentials: true,
      })

      if (response.status === 200) {
        setDatas(response.data)
        setNumRows(response.data.length)
      } else {
        console.log("Error");
      }

    } catch (err) {
      console.log("API error", err);
    }
  }

  useEffect(() => {
    if (selectedParentFolder) {

      tableToShow(selectedParentFolder, checkedCheckboxes);
    }
  }, [selectedParentFolder, checkedCheckboxes]);

  const collapseEle = filesName.map((fileName, index) => ({
    key: `${index + 1}`,
    label: <p style={{ fontSize: "1cqw" }}>{fileName}</p>,
    children: fileChildren[fileName] ? (
      <div className="scrollable-section">
        {fileChildren[fileName].map((child, childIndex) => (
          <div key={childIndex}>
            <input
              type="checkbox"
              id={`checkbox-${fileName}-${childIndex}`}
              checked={checkedCheckboxes[`${child}-${childIndex}`]}
              onChange={() => handleCheckboxChange(`${fileName}-${child}-${childIndex}`, childIndex)}
            />
            <label htmlFor={`checkbox-${fileName}-${childIndex}`} style={{ paddingLeft: "0.5vw" }}>{child}</label>
          </div>
        ))}
      </div>
    ) : (
      <div>Loading...</div>
    ),
    onClick: () => loadFileChildren(fileName),
  }));

  const items = [
    {
      key: "0",
      label: <button> Dummy Data </button>,
    },
    {
      key: "1",
      label: (
        <button>
          Name {"("}A to Z {")"}{" "}
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button>
          Name {"("}Z to A {")"}{" "}
        </button>
      ),
    },
  ];

  const handleDownload = () => {
    const csv = Papa.unparse(datas);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const data = datas.length > 0 ? Object.keys(datas[0]) : [];


  return (
    <>
      <ErrorBoundary>
        <div className="fileDictionary_container">
          <div className="fileDictionary_container_left">
            <div className="fileDictionary_container_left_dataSec">
              <div>
                <p className="fileDictionary_container_left_dataSec_txt">
                  Select A File To View The Headers
                </p>
              </div>
              <div className="searchNsortsec">
                <div className="searchDiv">
                  <Input
                    disableUnderline={true}
                    className="search-inputforFile"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon
                          className="searchicon"
                          sx={{ color: "#36556B" }}
                        />
                      </InputAdornment>
                    }
                    placeholder="Enter Text Here"
                    type="text"
                  ></Input>
                </div>
                <div
                  style={{
                    marginLeft: "0vw",
                    marginTop: "0vh",
                    maxHeight: "5vh",
                    height: "4.5vh",
                  }}
                >
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <div
                      className="sortBtn"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{
                        width: "6.5vw",
                        maxHeight: "5vh",
                        height: "5vh",
                        border: "1px solid #36556B",
                      }}
                    >
                      <p style={{ color: "#36556B", fontSize: "0.9cqw" }}>
                        Sort By
                      </p>
                      <img
                        src={downArrow}
                        alt=""
                        style={{ paddingLeft: "-1vw" }}
                      />{" "}
                    </div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <Collapse
                  className="bg-white border-none outline-none shadow-none font-semibold 2xl:text-xl"
                  items={collapseEle}
                />
              </div>
            </div>
            <div className="fileDictionary_container_left_btn">
              <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
                onClick={handleDownload}>
                <p style={{ color: "white" }}>Download</p>
              </button>
            </div>
          </div>


          <div className="fileDictionary_container_right">
            {datas.length === 0 ? (
              <div>
                <h2 style={{ fontSize: "2cqw", fontWeight: "650", color: "#36556B" }}>
                  Please Select a File to view...
                </h2>
              </div>
            ) : (
              <div className="tableContainer">

                  <table className="tableFile">
                    <thead className="tableHeadFile">
                      {data.map((items) => (
                        <th className="tableHeadFileTh" key={items}>
                          {items}
                        </th>
                      ))}
                    </thead>
                    <tbody className="tableBodyFile">
                      {datas.map((item, index) => (
                        <tr key={index}>
                          {data.map((key) => (
                            <td className="tableBodyFileTd" key={key}>
                              <p>{item[key] === '' ? '' : item[key]}</p>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>


                  <div className='paginationNbutton'>

                    <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "86%" }}>
                      {Math.floor(numRows / 100) * 10 >= 0 ? "" :
                        (
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ marginTop: "2.5vh", marginLeft: "0.5vw" }}> Rows per Page: 100</div>

                            <div style={{ marginTop: "2vh" }}>
                              <Stack spacing={1}>
                                <Pagination count={Math.floor(numRows / 100) * 10} page={page} onChange={handleChange} />
                              </Stack>
                            </div>
                          </div>
                        )}
                    </div>

                  </div>
              </div>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default FileDictionary;

