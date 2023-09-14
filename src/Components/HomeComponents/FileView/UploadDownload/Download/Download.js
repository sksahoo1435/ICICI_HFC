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

const Download = () => {
  const [selected, setSelected] = useState('');
  const [foldername, setFolderName] = useState([]);
  const [filesName, setFilesName] = useState([]);
  const [showAgreementNo, setShowAgreementNo] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checkedFileName, setCheckedFileName] = useState('');


  const handleapplicationSelection = async (e) => {
    try {
      const ApiToFetch = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${e}`;
      const response = await axios.get(ApiToFetch, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFilesName(response.data);
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
    getFolder();
  }, []);

  useEffect(() => {
    handleapplicationSelection(selected);
  }, [selected]);

  const handleCheckboxChange = (e) => {
    setShowAgreementNo(e.target.checked);
    if (!e.target.checked) {
      setInputValue('');
      setCheckedFileName('');
    }
    console.log(showAgreementNo)
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    console.log("check the function", handleCheckboxChange)
  };

  const userName = sessionStorage.getItem('userId');

  const handleDownload = async () => {

    if (inputValue === null || inputValue === '' || inputValue === undefined) {
      alert('please enter the value first....');
      return
    } else {
      try {
        const Api = `https://localhost:7062/api/ReportingModule/GetFileDataByFilter/${userName}/${checkedFileName}/${inputValue}`

        const response = await axios.get(Api, {
          withCredentials: true,
        })

        if (response.status === 200) {
          // setDataToDownload(response.data)

          const csv = Papa.unparse(response.data);
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${checkedFileName}.csv`;
          a.click();
          URL.revokeObjectURL(url);

        } else {
          console.log("API error");
        }
      } catch (err) {
        console.log("API error", err)
      }
    }


  };

  const items = [
    // {
    //   key: '0',
    //   label: <button > Clear Options </button>,

    // },
    {
      key: '1',
      label: <button  >Name {'('}A to Z {')'} </button>,

    },
    {
      key: '2',
      label: <button  >Name {'('}Z to A {')'} </button>,

    },

    // {
    //   key: '5',
    //   label: <button className={admin ? 'dropdownButtonSort' : 'vanishButton'} > {'+'} Add Options </button>,

    // },

  ];


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

          <div id="filternSearchSec">
            <p className="text-[#36556B] mt-3 text-lg font-semibold">Files</p>
            <div className="search_btn_sec">
              <div className="search_btn">
                <Input size="large" placeholder="Enter Text To Search..." style={{ width: '20vw', borderRadius: '5rem' }} prefix={<SearchOutlined />} />
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

          <div id="chck-list" className="mt-3">
            {filesName && filesName.length > 0 ? (
              <>
                {filesName.map((item) => (
                  <div id="checboxs" key={item}>
                    <input type="checkbox" onChange={() => setCheckedFileName(item)} />
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
          {filesName && filesName.length > 0 ? (
            <div>
              <div id="field-lists" className="grid mx-5">
                <p style={{
                  color: '#36556B', fontSize: '1.2cqw', lineHeight: '1rem',
                  fontWeight: '500', marginBottom: '1vh'
                }}>AGREEMENT_NO*</p>
                <input
                  type="text"
                  placeholder="Enter Text Here"
                  className="border px-3 mt-2 w-[25%] h-[5vh] outline-none rounded-full"
                  value={inputValue}
                  onChange={handleInputValueChange}
                />
              </div>

              <div className="my-4 absolute bottom-[-40vh] right-[1.5vw]">
                <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
                  onClick={handleDownload}>
                  Download
                </button>
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
