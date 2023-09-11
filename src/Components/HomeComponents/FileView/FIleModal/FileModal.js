import { Dropdown, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import "./FileModal.css"
import downArrow from "../../../../Assets/Union 2.svg";
import axios from 'axios';
import TableFile from './TableFile/TableFile';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as XLSX from 'xlsx';
// import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import FilterImg from '../../../../Assets/filter.svg'
import Papa from 'papaparse';

const FileModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  // const [admin, setAdmin] = useState(true);
  const [pdata, setPdata] = useState([{}]);
  const [selectDrop, setSelectDrop] = useState(0);
  const [selectFilter, setSelectFilter] = useState(0);
  const FileName = sessionStorage.getItem("filename");
  const user = sessionStorage.getItem("loginId");
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(1)

  const userId = sessionStorage.getItem('userId');

  const fetchContentInFiles = async () => {
    try {
      const getContentInFilesApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${userId}/${FileName}/${page}/1000`;
      const filesResponse = await axios.get(getContentInFilesApiUrl, {
        withCredentials: true,
      });
      console.log(FileName + user);
      // const content = filesResponse.data;
      let pro = filesResponse.data;

      setPdata(pro);
      console.log(`Content in Files  `, pro);
      setNumRows(pro.length)
    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  useEffect(() => {
    fetchContentInFiles();
  }, []);

  const handleChange = (event, value) => {
    setPage(Number(value));
  };


  const handleFileDownload = async (e) => {

    if (e === 'xlsx') {

      const ws = XLSX.utils.json_to_sheet(pdata);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');

    } else if (e === 'pdf') {
      //please give code here

      alert("it is on developement stage....")

    } else if (e === 'csv') {

      const csv = Papa.unparse(pdata);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `datas.csv`;
      a.click();
      URL.revokeObjectURL(url);

    } else if (e === 'json') {

      const json = JSON.stringify(pdata, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();
      URL.revokeObjectURL(url);

    }
  }

  const filterItems = [
    {
      key: '0',
      label: <button className={selectFilter > 0 ? 'cancelButton dropdownButtonSort' : 'vanishButton'} onClick={() => { setSelectFilter(0) }}> {'x'} Clear Options </button>,

    },
    {
      key: '1',
      label: <button className={selectFilter === 1 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(1) }} >Business Date</button>,

    },
    {
      key: '2',
      label: <button className={selectFilter === 2 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(2) }} >Active</button>,

    },
    {
      key: '3',
      label: <button style={{ borderBottom: "1px solid #ededed" }} className={selectFilter === 3 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(3) }} >Inactive</button>,

    },

    // {
    //   key: '5',
    //   label: <button className={admin ? 'dropdownButtonSort' : 'vanishButton'} > {'+'} Add Options </button>,

    // }

  ];
  // Active , Inactive , File Type , Text File , Excel File , JSON file , CSv,Tab 
  const items = [
    {
      key: '0',
      label: <button className={selectDrop > 0 ? 'cancelButton dropdownButtonSort' : 'vanishButton'} onClick={() => { setSelectDrop(0) }}> {'x'} Clear Options </button>,

    },
    {
      key: '1',
      label: <button className={selectDrop === 1 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectDrop(1) }} >Name {'('}A to Z {')'} </button>,

    },
    {
      key: '2',
      label: <button className={selectDrop === 2 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectDrop(2) }} >Name {'('}Z to A {')'} </button>,

    },
  ];

  return (
    <Modal centered

      open={modalOpen}
      footer={null}
      title={null}
      width={"auto"}
      onCancel={() => { setModalOpen(false) }}
    >
      <div className="modalContent">
        <p className='titleReport'>Report</p>
        <div className='headerContent'>

          <div className='startHead'>

            <div style={{ marginLeft: "0vw", marginTop: "1vh", maxHeight: "5vh", height: "4.5vh" }}>
              <Dropdown menu={{
                items,
              }}
                trigger={['click']}

              >
                <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                  style={{ width: "6.5vw", maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", }}>
                  <p style={{ color: "#36556B" }}>Sort By</p>
                  <img src={downArrow} alt="" style={{ paddingLeft: "-1vw" }} /> </div>
              </Dropdown>
            </div>

            <div style={{ marginLeft: "-1vw", marginTop: "1vh", height: "4vh", }} >
              <Dropdown menu={{
                items: filterItems
              }}
                trigger={['click']}

              >
                <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                  style={{ maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", width: "8vw" }} >
                  <img src={FilterImg} alt="" style={{ paddingLeft: "0vw" }} />
                  <p style={{ color: "#36556B" }}>Filters</p>
                  <img src={downArrow} alt="" style={{ paddingLeft: "-2vw" }} />
                </div>
              </Dropdown>
            </div>

          </div>

          {/* <div className='endHead'>
            <button className="requestAccessBtnforModal">Request Access</button>

          </div> */}

        </div>
        <div className='tableContent'>
          <TableFile data={pdata} />
        </div>

        <div className='paginationNbutton'>

          <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "86%" }}>
            {Math.floor(numRows / 1000) * 10 >= 0 ? "" :
              (
                <div style={{display:"flex",flexDirection:"row"}}>
                  <div style={{ marginTop: "2.5vh", marginLeft: "0.5vw" }}> Rows per Page: 1000</div>

                  <div style={{ marginTop: "2vh" }}>
                    <Stack spacing={1}>
                      <Pagination count={Math.floor(numRows / 1000) * 10} page={page} onChange={handleChange} />
                    </Stack>
                  </div>
                </div>
              )}
          </div>

          <div className='btnSec'>
            <select className='customSelect' placeholder='Download' value='Download' onChange={(e) => handleFileDownload(e.target.value)}>
              <option hidden>Download</option>
              <option value='csv'>CSV</option>
              {/* <option value='pdf'>PDF</option> */}
              <option value='xlsx'>XLSX</option>
              {/* <option value='json'>JSON</option> */}
            </select>
          </div>
        </div>

      </div>
    </Modal >
  )
}

export default FileModal
