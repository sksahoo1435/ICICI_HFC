import React, { useState } from 'react'
import { Dropdown } from "antd";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './download.css';
import downArrow from '../../../../../Assets/Union 2.svg'
// srch
import { Input } from 'antd';
import { SearchOutlined } from '@mui/icons-material';



const Download = () => {
  const [selected, setSelected] = useState();

  // for FINN selection
  const [finn, setFinn] = useState(false);
  // for aps selection
  const [aps, setAps] = useState(false);

  // temp
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleapplicationSelection = (e) => {
    setSelected(e.target.value);
    if (e.target.value === "FINN") {
      setFinn(true);
      setAps(false);
    }
    else if (e.target.value === "APSSystem") {
      setAps(true);
      setFinn(false);
    }
  }


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
      <div id="container" className='downloadContainer'>

        <div id="left" className='downloadContainer_left'>
          <div id="select_Application">

            <p className='text-select_app'>
              Select Application
            </p>

            <div>
              <FormControl style={{ width: "90%", marginTop: "2vh" }}>
                <InputLabel id="demo-simple-select-label">Click to Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selected}
                  label="Option"
                  onChange={handleapplicationSelection} style={{ borderRadius: "5rem", height: "5.5vh" }}
                >
                  <MenuItem value="FINN" style={{ fontSize: "1rem" }}>FINN</MenuItem>
                  <MenuItem value="APSSystem">APS System</MenuItem>
                </Select>
              </FormControl>
            </div>

          </div>

          <div id="filternSearchSec">

            <p className='text-[#36556B] mt-3 text-lg font-semibold'>
              Files
            </p>

            <div className='search_btn_sec'>

              <div className='search_btn'>
                <Input size="large" placeholder="Enter Text To Search..." style={{ width: "20vw", borderRadius: "5rem" }} prefix={<SearchOutlined />} />
              </div>

              <div style={{ marginLeft: "0vw", marginTop: "0vh", maxHeight: "5vh", height: "5.5vh" }}>
                <Dropdown menu={{
                  items,
                }}
                  trigger={['click']}

                >
                  <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                    style={{ width: "6.5vw", maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", }}>
                    <p style={{ color: "#36556B", fontSize: "0.9cqw" }}>Sort By</p>
                    <img src={downArrow} alt="" style={{ paddingLeft: "-1vw" }} /> </div>
                </Dropdown>
              </div>

            </div>
          </div>

          <div id="chck-list" className='mt-3'>
            {finn ? (
              <>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">COMMON_BORROWER_UPLOAD.xlsx</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">Fraud_Restructed_UPLOAD.xlsx</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">NPA_TRACKER_2023-07-30 DOWNLOAD.xlsx</label>
                </div>
              </>
            ) : (
              ""
            )}

            {aps ? (
              <>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">FA_DUMP_DOWN.csv</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">DISBURSMENT_DUMP_DOWNLOAD.csv</label>
                </div>
              </>
            ) : (
              ""
            )}


            {(finn === false && aps === false) ? (
              <>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">COMMON_BORROWER_UPLOAD.xlsx</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">Fraud_Restructed_UPLOAD.xlsx</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">NPA_TRACKER_2023-07-30 DOWNLOAD.xlsx</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">FA_DUMP_DOWN.csv</label>
                </div>
                <div id="checboxs">
                  <input type="checkbox" />
                  <label className='mx-2' htmlFor="">DISBURSMENT_DUMP_DOWNLOAD.csv</label>
                </div>
              </>
            ) : ""}
          </div>
        </div>

        <div className='downloadContainer_border'></div>

        <div className='downloadContainer_right'>
          {(!finn && !aps) ? (
            <div className='text_blank'>
              <p className=''>
                Please Select A File
              </p>
            </div>
          ) : ""}

          {(finn === true && aps === false) ? (
            <>
              <div id="field-lists" className='grid mx-5'>
                <p style={{ color: "#36556B", fontSize: "1.2cqw", lineHeight: "1rem", fontWeight: "500", marginBottom: "1vh" }}>
                  AGREEMENT_NO.*
                </p>
                <input type="text" placeholder='Enter Text Here' className='border px-3 mt-2 w-[25%] h-[5vh] outline-none rounded-full' />
              </div>

            </>
          ) : ""}

          {(aps === true && finn === false) ? (
            <div id="field-lists" className='flex mx-5'>
              <div>
                <p style={{ color: "#36556B", fontSize: "1.2cqw", lineHeight: "1rem", fontWeight: "500", marginBottom: "1vh" }}>
                  APPLICATION_ID*
                </p>
                <input type="text" placeholder='Enter Text Here' className='border px-3 mt-2 mx-2 h-[5vh] outline-none rounded-full' />
              </div>

              <div>
                <p style={{ color: "#36556B", fontSize: "1.2cqw", lineHeight: "1rem", fontWeight: "500", marginBottom: "1vh" }}>
                  SANCTION_DATE
                </p>
                <input type="date" placeholder='DD/MM/YYYY' className='border px-3 mt-2 mx-2 h-[5vh] outline-none rounded-full' />
              </div>
            </div>
          ) : ""}

          {((finn === true && aps === false) || (aps === true && finn === false)) ?
            <div className='my-4 absolute bottom-[-40vh] right-[1.5vw]'>
              <button className='border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]'>Download</button>
            </div> : ""}
        </div>

      </div>
    </>
  )
}

export default Download
