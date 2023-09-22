import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './download.css';
import downArrow from '../../../../../Assets/Union 2.svg';
import { Input } from 'antd';
import { SearchOutlined } from '@mui/icons-material';
import axios from 'axios';
import Papa from 'papaparse';
import PreviewDownload from './PreviewDownload';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";

const Download = () => {
  const [selected, setSelected] = useState('');
  const [foldername, setFolderName] = useState([]);
  const [filesName, setFilesName] = useState([]);
  const [filesNameForSearch, setFilesNameForSearch] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [checkedFileName, setCheckedFileName] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [startDatefilter, setStartDatefilter] = useState(new Date());
  const [endDatefilter, setEndDatefilter] = useState(new Date());
  const [startDatefilterStatus, setStartDatefilterStatus] = useState(false);
  const [endDatefilterStatus, setEndDatefilterStatus] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [searchString, setSearchString] = useState('');
  const [sortbyname, setSortByName] = useState('');
  const [downloadActive, setDownloadActive] = useState(false)

  const [columnName, setColumnName] = useState('')

  const handleapplicationSelection = async (e) => {
    setSelectedFolder(e)
    try {
      const ApiToFetch = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${e}`;
      const response = await axios.get(ApiToFetch, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFilesName(response.data);
        setFilesNameForSearch(response.data)
      } else {
        console.log('api status', response.status);
      }
    } catch (err) {
      console.log('API error', err);
    }
  };

  const getFolder = async () => {
    try {
      const ApiForFolder = `https://localhost:7062/api/ReportingModule/GetFoldersWithPermissions`;

      const response = await axios.get(ApiForFolder, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFolderName(response.data);
      } else {
        console.log('api response', response.status);
      }
    } catch (err) {
      console.log('Error in API', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/ReportingModuleFilter/filterFieldNames?tableName=${selectedFolder}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setColumnName(response.data)
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [selectedFolder])

  useEffect(() => {
    getFolder();
  }, []);

  useEffect(() => {
    handleapplicationSelection(selected);
  }, [selected]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    console.log("check the function", e.target.value)
  };

  const userName = sessionStorage.getItem('userId');

  const handleDownload = async () => {
    if (inputValue === null || inputValue === '') {
      alert('please enter the value first....');
      return
    } else {

      const csv = Papa.unparse(previewData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${checkedFileName}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setPreviewData([]);
      setDownloadActive(false);
    }
  };

  const handlePreviw = async () => {
    if (startDatefilterStatus && endDatefilterStatus && (inputValue !== null || inputValue !== '')) {
      const dataArray = inputValue.split(',')
      const formattedDataArray = dataArray.map(item => item);

      const formattedStartDate = startDatefilterStatus ? format(startDatefilter, 'yyyy-MM-dd', new Date()) : null;
      const formattedEndDate = endDatefilterStatus ? format(endDatefilter, 'yyyy-MM-dd', new Date()) : null;

      const sendFileToDb = `https://localhost:7062/api/ReportingModuleFilter/downloadwithcolumnanddate?username=${userName}&filename=${selectedFolder}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&columnName=${columnName}`

      try {
        const response = await axios.post(sendFileToDb, formattedDataArray, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setPreviewData(response.data)
          console.log("this is on date filter", response.data)
          setDownloadActive(true);
        } else {
          console.log("API error");
        }
      } catch (err) {
        console.log("API error", err)
      }
    } else if (startDatefilterStatus && endDatefilterStatus && (inputValue === null || inputValue === '')) {
      alert("please enter the value to column...");
      return
    } else {
      if (inputValue === null || inputValue === '') {
        alert('please enter the value first....');
        return
      } else {
        const dataArray = inputValue.split(',')
        const formattedDataArray = dataArray.map(item => item);

        const sendFileToDb = `https://localhost:7062/api/ReportingModuleFilter/downloadwithcolumn?username=${userName}&filename=${selectedFolder}&columnName=${columnName}`

        try {
          const response = await axios.post(sendFileToDb, formattedDataArray, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setPreviewData(response.data)
            setDownloadActive(true);
          } else {
            console.log("API error");
          }
        } catch (err) {
          console.log("API error", err)
        }
      }
    }

  }

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


  const searchFiles = async (subStr) => {
    if (searchString === '') {
      setFilesName(filesNameForSearch);
    } else {
      try {
        const apiToFetch = `https://localhost:7062/api/ReportingModuleFilter/GetFilesInFolderSearch/${selectedFolder}/${subStr}`;
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
  }

  useEffect(() => {
    searchFiles(searchString)
  }, [searchString])

  useEffect(() => {

    const fetchData = async () => {
      setSearchString('');
      try {
        const ApiToFetch = `https://localhost:7062/api/ReportingModuleFilter/GetFilesInFolderSortBy/${selectedFolder}/${sortbyname}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setFilesName(response.data);

        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyname]);

  return (
    <>
      <div id="container" className="downloadContainer">
        <div id="left" className="downloadContainer_left">
          <div id="select_Application">
            <p className="text-select_app">Select Application</p>
            <div>
              <FormControl style={{ width: '90%', marginTop: '2vh' }}>
                <InputLabel id="demo-simple-select-label">Click to Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selected}
                  label="Option"
                  onChange={(e) => setSelected(e.target.value)}
                  style={{ borderRadius: '5rem', height: '5.5vh' }}
                >
                  {foldername &&
                    foldername.length > 0 &&
                    Object.values(foldername).map((item) => (
                      <MenuItem value={item.folderName} key={item.folderName} style={{ fontSize: '1cqw' }}>
                        {item.folderName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {selectedFolder !== '' &&
            <div id="filternSearchSec">
              <p className="text-[#36556B] mt-3 text-lg font-semibold">Files</p>
              <div className="search_btn_sec">

                <div className="search_btn">
                  <Input size="large" placeholder="Enter Text To Search..."
                    style={{ width: '20vw', borderRadius: '5rem' }}
                    prefix={<SearchOutlined />} value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </div>

                <div style={{ marginLeft: '0vw', marginTop: '0vh', maxHeight: '5vh', height: '5.5vh' }}>
                  <Dropdown menu={{ items }}>
                    <div
                      className="sortBtn"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ width: '6.5vw', maxHeight: '5vh', height: '5vh', border: '1px solid #36556B' }}
                    >
                      <p style={{ color: '#36556B', fontSize: '0.9cqw' }}>Sort By</p>
                      <img src={downArrow} alt="" style={{ paddingLeft: '-1vw' }} />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          }

          <div id="chck-list" className="mt-3">
            {filesName && filesName.length > 0 ? (
              <>
                {filesName.map((item) => (
                  <div id="checboxs" key={item}>
                    <input
                      type="checkbox"
                      onChange={() => {
                        setSelectedCheckbox(item);
                        setCheckedFileName(item === selectedCheckbox ? '' : item);
                      }}
                      checked={item === selectedCheckbox}
                    />
                    <label className="mx-2" htmlFor="" style={{ fontSize: '1cqw' }}>
                      {item}
                    </label>
                  </div>
                ))}
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="downloadContainer_border"></div>

        <div className="downloadContainer_right">
          {checkedFileName !== '' ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
              <div id="field-lists" className="grid mx-5">
                <p style={{
                  color: '#36556B', fontSize: '1.2cqw', lineHeight: '1rem',
                  fontWeight: '500', marginBottom: '1vh'
                }}>{`${columnName}*`}</p>
                <div style={{ display: "flex", flexDirection: "row", gap: "2vw" }}>
                  <input
                    type="text"
                    placeholder="Enter Text Here"
                    className="border px-3 mt-2 w-[25%] h-[5vh] outline-none rounded-full"
                    value={inputValue}
                    onChange={handleInputValueChange}
                  />
                  <div className="dateInputsDownloadSec">
                    <div className="dateInputsDownload">

                      <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
                        <p style={{ color: "#36556B", fontSize: "1cqw" }}>Start Date</p>
                        <ReactDatePicker className="datepickerDownload"
                          selected={startDatefilter}
                          onChange={(date) => {
                            if (date) {
                              setStartDatefilter(date);
                              setStartDatefilterStatus(true);
                            } else {
                              setStartDatefilter(null);
                              setStartDatefilterStatus(false);
                            }
                          }}
                          isClearable
                          placeholderText="Enter date..!"
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
                        <p style={{ color: "#36556B", fontSize: "1cqw" }}>End Date</p>
                        <ReactDatePicker className="datepickerDownload"
                          selected={endDatefilter}
                          onChange={(date) => {
                            if (date) {
                              setEndDatefilter(date); setEndDatefilterStatus(true)
                            }
                            else {
                              setEndDatefilter(null);
                              setEndDatefilterStatus(false);
                            }
                          }}
                          isClearable
                          placeholderText="Enter date..!"
                        />
                      </div>

                    </div>
                  </div>
                  {inputValue === '' ? <button className='submitBtnDisable' disabled>Submit</button> :
                    <button className='submitBtn' onClick={handlePreviw}>Submit</button>}
                </div>
              </div>
              {previewData && previewData.length > 0 &&
                <div className='prviewDownloadTable'>
                  <PreviewDownload data={previewData} />
                </div>
              }
              <div style={{ position: "absolute", right: "0", bottom: "0" }}>
                {downloadActive ? <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
                  onClick={handleDownload}>
                  Download
                </button> : <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]" disabled>
                  Download
                </button>}
              </div>
            </div>
          ) : (
            <div className="text_blank">
              <p className="">Please Select A File</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Download;
