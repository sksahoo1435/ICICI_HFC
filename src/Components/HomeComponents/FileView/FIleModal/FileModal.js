import { Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import "./FileModal.css"
import axios from 'axios';
import TableFile from './TableFile/TableFile';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import Statecontext from '../../../Context/Statecontext';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';

const FileModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  const { fileNameTosend,apiBaseurl } = useContext(Statecontext);

  const [pdata, setPdata] = useState([{}]);
  const [fullDataToDownload, setFullDataToDownload] = useState([]);
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(1)
  const [accessGranted, setAccessGranted] = useState(true);

  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const userId = sessionStorage.getItem('userId');

  const pageSize = 100;

  const fetchContentInFiles = async (e, newPage) => {

    try {
      
      const getContentInFilesApiUrl = `${apiBaseurl}api/ReportModules/getmodaldata${userId}/${e}/${pageSize}/${newPage}`;
      const filesResponse = await axios.get(getContentInFilesApiUrl, {
        withCredentials: true,
      });
      console.log("datafetchonclick of modal",filesResponse)
      if (filesResponse.data === "You dont have access to this data") {
        setAccessGranted(false);
      } else {

        let pro = filesResponse.data.data;
       // console("pro is",pro);
        setPdata(pro);
        setNumRows(filesResponse.data.totalCount);
        setAccessGranted(true);
        setPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching files in the folder:", error);
    }
  };

  useEffect(() => {
    fetchContentInFiles(fileNameTosend, page);
    console.log(sortColumn, sortOrder);
    getFullFileData(fileNameTosend)
  }, [fileNameTosend]);

  const handleChange = (event, value) => {
    fetchContentInFiles(fileNameTosend, value)

  };

  const getFullFileData = async (filename) => {
    try {
      const getContentInFilesApiUrl = `${apiBaseurl}api/ReportModules/getallmodaldata/${userId}/${filename}`;
      const filesResponse = await axios.get(getContentInFilesApiUrl, {
        withCredentials: true,
      });
      
      if (filesResponse.status === 200) {
        setFullDataToDownload(filesResponse.data)
      } else {
        console.log(filesResponse)
      }

    } catch (error) {
      console.error("Error fetching files in the folder:", error);
    }
  }


  const handleFileDownload = async (e) => {

    if (e === 'Fxlsx' || e === 'Fcsv') {
      
      if (e === 'Fxlsx') {

        const ws = XLSX.utils.json_to_sheet(fullDataToDownload);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');

      } else if (e === 'Fcsv') {

        const csv = Papa.unparse(fullDataToDownload);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `datas.csv`;
        a.click();
        URL.revokeObjectURL(url);

      } else if (e === 'Fjson') {

        const json = JSON.stringify(fullDataToDownload, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);

      }

    } else {
      if (e === 'Cxlsx') {

        const ws = XLSX.utils.json_to_sheet(pdata);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');

      } else if (e === 'Ccsv') {

        const csv = Papa.unparse(pdata);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `datas.csv`;
        a.click();
        URL.revokeObjectURL(url);

      } else if (e === 'Cjson') {

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

  }


  const handleSort = (column, order) => {

    setSortColumn(column);
    setSortOrder(order);
    fetchSortedData(column, order);

  };

  const fetchSortedData = async (column, order) => {
    try {

      const sortedDataResponse = await axios.get(`${apiBaseurl}api/ReportingModuleFilter/GetFilesInFolderUsingFilter/${userId}/${fileNameTosend}/${page}/${pageSize}/${column}/${order}`, {
        withCredentials: true,
      });
      console.log("sortedDataResponse",sortedDataResponse)
      setPdata(sortedDataResponse.data.data);
      setNumRows(sortedDataResponse.data.totalCount);
      setAccessGranted(true);
      setPage(page);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };


  let userRole = sessionStorage.getItem("userRole");
  console.log("xyz",pdata,accessGranted,handleSort,sortColumn,sortOrder);
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

          {userRole === 'User' ? <div className='endHead'>
            <button className="requestAccessBtnforModal">Request Access</button>

          </div> : ""}

        </div>
        <div className='tableContent'>
          {accessGranted ? (
            <TableFile data={pdata} onSort={handleSort} />
          ) : (
            <div className='accessDeniedMessage'>
              <p className='titleReport' style={{ fontSize: '15px' }}>You don't have access to this data.</p>
            </div>
          )}
        </div>

        <div className='paginationNbutton'>

          <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "86%" }}>
            {numRows > 0 && (
              <div className='paginationNbuttonmodal'>
                <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginTop: "2.5vh", marginLeft: "1vw" }}> Rows per Page: {pageSize}</div>
                    <div style={{ marginTop: "2vh" }}>
                      <Stack spacing={1}>
                        <Pagination count={Math.ceil(numRows / pageSize)} page={page} onChange={handleChange} />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='btnSec'>

            <Dropdown title="Download">

              <Dropdown.Menu title="Full File Download">
                <Dropdown.Item onClick={() => handleFileDownload('Fcsv')}>CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFileDownload('Fxlsx')}>XLSX</Dropdown.Item>
              </Dropdown.Menu>

              <Dropdown.Menu title="Current Page Download">
                <Dropdown.Item onClick={() => handleFileDownload('Ccsv')}>CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFileDownload('Cxlsx')}>XLSX</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>


          </div>
        </div>

      </div>
    </Modal >
  )
}

export default FileModal
