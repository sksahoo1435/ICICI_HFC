import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Collapse } from "antd";
import { Dropdown } from "antd";
import Papa from 'papaparse';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";
import downArrow from "../../../Assets/Union 2.svg";
import "./FileDictionary.css";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { useContext } from "react";
import Statecontext from "../../Context/Statecontext";

const FileDictionary = () => {
  const [datas, setDatas] = useState([]);
  const [filesName, setFilesName] = useState([]);
  const [filesNameForSearch, setFilesNameForSearch] = useState([]);
  const [fileChildren, setFileChildren] = useState({});
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [selectedParentFolder, setSelectedParentFolder] = useState(null);
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(0);
  const [keyToRemount, setKeyToRemount] = useState(0);
  const [sortbyname, setSortByName] = useState('');
  const [searchText, setSearchText] = useState("");
  const [startDatefilter, setStartDatefilter] = useState(new Date());
  const [endDatefilter, setEndDatefilter] = useState(new Date());
  const { apiBaseurl } = useContext(Statecontext);
  const [isStartDate, setisStartDate] = useState(false);
  const [isEndDate, setisEndDate] = useState(false);
  const [parentTable, setParentTable] = useState([]);
  const [selectedparentTable, setSelectedParentTable] = useState('');
  const [isParentTableShow, setIsParentTableShow] = useState(false)
  const [checkedIndex, setCheckedIndex] = useState(null);


  const pageSize = 500;

  const handleChange = (event, value) => {
    tableToShow(selectedParentFolder, checkedCheckboxes, value);
  };

  const getParentTable = async () => {

    try {
      const apiToFetch = `${apiBaseurl}api/Admin/GetFileNamesForDictionarys`;
      const response = await axios.get(apiToFetch, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setParentTable(response.data);
      } else {
        console.log("Something went wrong", response);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }

  }

  const getFilesName = async (foldername) => {
    try {
      const apiToFetch = `${apiBaseurl}api/FileDictionary/GetDistinctRelationTables?tableName=${foldername}`;
      const response = await axios.get(apiToFetch, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFilesName(response.data);
        setFilesNameForSearch(response.data);
      } else {
        console.log("Something went wrong", response);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const loadFileChildren = async (fileName) => {
    try {
      const apiToFetchChildren = `${apiBaseurl}api/Admin/GetColumnNamesByTableName/${fileName}`;
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
  };

  const handleCheckboxChange = (tableName, fileName) => {
    let copycheckedCheckboxes = [...checkedCheckboxes];

    if (copycheckedCheckboxes.includes(tableName)) {

      copycheckedCheckboxes.splice(copycheckedCheckboxes.indexOf(tableName), 1)

    } else {

      copycheckedCheckboxes.push(tableName)

    }

    setCheckedCheckboxes(copycheckedCheckboxes)

  };


  const handleCheckboxParentFolder = (parentname, index) => {
    setIsParentTableShow(true);
    getFilesName(parentname);
    setSelectedParentTable(parentname)
    if (index === checkedIndex) {
      setCheckedIndex(null);
    } else {
      setCheckedIndex(index);
    }
  }

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);
    fetchFilesBySearch(inputValue);
  };

  function convertToDotNotation(inputArray) {
    return inputArray.map(item => {

      const parts = item.split('-');
      const result = parts.slice(0, -1).join('.');

      return result;
    });
  }

  const getheaderName = (files, parentName) => {
    var x = files.map(item => {

      const parts = item.split('-');
      const result = parts[0]

      return result;
    });

    var arr = x.filter((item) => { return item !== parentName })

    return [...new Set(arr)]
  }


  const tableToShow = async (tableName, filesName, newPage) => {

    console.log("inside table show", tableName, filesName,startDatefilter === null,filesName.length === 0)

    if (startDatefilter === null && endDatefilter === null && filesName.length === 0) {
      console.log("enter to date...")
      return
    } else {

      if (isStartDate && isEndDate) {
        const formattedStartDate = isStartDate ? format(startDatefilter, 'yyyy-MM-dd', new Date()) : null;
        const formattedEndDate = isEndDate ? format(endDatefilter, 'yyyy-MM-dd', new Date()) : null;

        if (filesName.length === 0) {
          setIsParentTableShow(false)
          setDatas([])
        } else {
          setIsParentTableShow(true)
        }

        try {
          const baseUrl = `${apiBaseurl}api/FileDictionary/FileDictionaryWithDateFilter`;

          const datafortable = {
            "columnNames": convertToDotNotation(filesName),
            "primaryTable": selectedparentTable,
            "joinTables": getheaderName(filesName, selectedparentTable),
            "pageNumber": newPage,
            "pageSize": pageSize,
            "startDate": formattedStartDate,
            "endDate": formattedEndDate
          }

          const response = await axios.post(baseUrl, datafortable, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log("date filter file dict", response)

          if (response.status === 200) {
            if (response.data === 'FILTER DATA NOT PRESENT') {
              setDatas('FILTER DATA NOT PRESENT')
              setNumRows(0)
            } else {
              setDatas(response.data.data)
              setNumRows(response.data.totalRowCount)
              setPage(newPage);
            }
          } else {
            console.log("API error");
          }

        } catch (err) {
          console.log("API error", err);
        }

      } else {
        if (filesName.length === 0) {
          setIsParentTableShow(false)
          setDatas([])
        } else {
          setIsParentTableShow(true)
        }
        try {
          const baseUrl = `${apiBaseurl}api/FileDictionary/FileDicitonary`;

          const datafortable = {
            "columnNames": convertToDotNotation(filesName),
            "primaryTable": selectedparentTable,
            "joinTables": getheaderName(filesName, selectedparentTable),
            "pageNumber": newPage,
            "pageSize": pageSize
          }

          console.log("data for the table is", datafortable)

          const response = await axios.post(baseUrl, datafortable, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setDatas(response.data.data)
            setNumRows(response.data.totalRowCount)
            setPage(newPage);
          } else {
            console.log("API error");
          }


        } catch (err) {
          console.log("API error", err);
        }
      }

    }


  };

  const fetchFilesBySearch = async (searchText) => {
    if (searchText === '') {
      setFilesName(filesNameForSearch);
    } else {
      try {
        const apiToFetch = `${apiBaseurl}api/AdminFilter/GetFileNamesBySearchInDictionary?searchString=${searchText}`;
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
  };

  const PTableEle = parentTable.map((tablename, ind) => (
    <div className="parentTableContainer" key={ind}>

      <p>{tablename}</p>

      <input type="checkbox" checked={ind === checkedIndex} onChange={() => handleCheckboxParentFolder(tablename, ind)} />

    </div>
  ))


  const areAllChildrenSelected = (fileName,index) => {
    console.log("check collapse ele...", fileName, index)
    return fileChildren[fileName].every((child, childIndex) => {
      return checkedCheckboxes[`${fileName}-${child}-${childIndex}`];
    });
  };

  const collapseEle = filesName.map((fileName, index) => {
    
    return {
      key: `${index + 1}`,
      label: <p style={{ fontSize: "1cqw" }}>{fileName}</p>,
      children: fileChildren[fileName] ? (
        <div className="scrollable-section">
          <div>
            <input
              type="checkbox"
              checked={areAllChildrenSelected(fileName,index)}
              onChange={() => handleSelectAllChildren(fileName)}
            />
            <label>Select All</label>
          </div>

          {fileChildren[fileName].map((child, childIndex) => (
            <div key={childIndex}>
              <input
                type="checkbox"
                id={`checkbox-${fileName}-${childIndex}`}
                checked={checkedCheckboxes[`${fileName}-${child}`]}
                onChange={() =>
                  handleCheckboxChange(`${fileName}-${child}-${childIndex}`, childIndex)
                }
              />
              <label htmlFor={`checkbox-${fileName}-${childIndex}`} style={{ paddingLeft: "0.5vw" }}>
                {child}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      ),
      onClick: () => {
        loadFileChildren(fileName);
        setSelectedParentFolder(fileName);
        setisEndDate(false);
        setEndDatefilter(null);
        setStartDatefilter(null);
        setisStartDate(false);
      },
    };
  });

  const handleSelectAllChildren = (fileName) => {

    const result = fileChildren[fileName].map((fieldName, ind) => `${fileName}-${fieldName}-${ind}`);
    const uniqueValues = new Set([...checkedCheckboxes, ...result]);

    const newCheckedCheckboxes = [...uniqueValues];
    setCheckedCheckboxes(newCheckedCheckboxes);
  };

  useEffect(() => {
    getParentTable();
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `${apiBaseurl}api/AdminFilter/GetFileNamesForDictionarySortBy?sortOrder=${sortbyname}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setFilesName(response.data)
          setKeyToRemount(keyToRemount + 1)
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyname]);


  useEffect(() => {
    if (selectedParentFolder) {
      tableToShow(selectedParentFolder, checkedCheckboxes, page);
    }
  }, [checkedCheckboxes, page, startDatefilter, endDatefilter]);

  // console.log("check globally...", selectedParentFolder, checkedCheckboxes, page, startDatefilter, endDatefilter)

  const items = [
    {
      key: '1',
      label: 'A-Z',
      onClick: () => setSortByName('A-Z')
    },
    {
      key: '2',
      label: 'Z-A',
      onClick: () => setSortByName('Z-A')
    },
  ];

  const handleDownload = () => {
    const csv = Papa.unparse(datas);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `files.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const data = datas.length > 0 ? Object.keys(datas[0]) : [];

  return (
    <>
      <ErrorBoundary>
        <div className="fileDictionary_container" >
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
                    value={searchText}
                    onChange={handleSearchInputChange}
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
              {isParentTableShow === false ?
                <div className="isParentTableShow_divContainer">
                  {PTableEle}
                </div> :
                <div className="collapse_scrollabalesec">
                  <Collapse
                    className="bg-white border-none outline-none shadow-none font-semibold 2xl:text-xl"
                    items={collapseEle}
                  />
                </div>}
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
              <div className="FileDictionaryTableSecdateInputs">

                <div className="dateInputs">
                  <div style={{ display: "flex", flexDirection: "column", gap: "-2vh" }}>
                    <p style={{ color: "#36556B", fontSize: "1cqw" }}>Start Date</p>
                    <ReactDatePicker className="datepicker"
                      selected={startDatefilter}
                      onChange={(date) => {
                        if (date) {
                          setStartDatefilter(date);
                          setisStartDate(true);
                        } else {
                          setStartDatefilter(null);
                          setisStartDate(false);
                        }
                      }}
                      isClearable
                      placeholderText="Start date.."
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "-2vh" }}>
                    <p style={{ color: "#36556B", fontSize: "1cqw" }}>End Date</p>
                    <ReactDatePicker className="datepicker"
                      selected={endDatefilter}
                      onChange={(date) => {
                        if (date) {
                          setEndDatefilter(date);
                          setisEndDate(true);
                        } else {
                          setEndDatefilter(null);
                          setisEndDate(false);
                        }
                      }}
                      isClearable
                      placeholderText="End date.."
                    />
                  </div>
                </div>

                <div className="tableContainer">
                  {datas === 'FILTER DATA NOT PRESENT' ? (<h1>
                    DATA NOT PRESENT
                  </h1>) : (
                    <div className="table-container_filedict">
                      <div className="table-wrapper">
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
                      </div>
                    </div>





                  )}

                </div>
                {numRows > 0 && (
                  <div className='paginationNbutton'>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "100%", justifyContent: "center" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginTop: "2.5vh", marginLeft: "1vw", fontSize: "1cqw" }}> Rows per Page: {pageSize}</div>
                        <div style={{ marginTop: "2vh" }}>
                          <Stack spacing={1}>
                            <Pagination count={Math.ceil(numRows / pageSize)} page={page} onChange={handleChange} />
                          </Stack>
                        </div>
                      </div>
                    </div>
                  </div>

                )}
                <div className="fileDictionary_container_left_btn">
                  <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
                    onClick={handleDownload}>
                    <p style={{ color: "white" }}>Download</p>
                  </button>
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
