import React, { useContext, useEffect, useState } from 'react'
import "./FileContent.css"
import { Dropdown } from "antd";
import downArrow from "../../../../Assets/Union 2.svg";
import FileGrid from '../FIleGrid/FileGrid';
import FileList from '../FileList/FileList';
import axios from 'axios';
import Statecontext from '../../../Context/Statecontext';


const FileContent = ({ admin, gridView }) => {
  const { setFilesInfolder,folderName } = useContext(Statecontext);
  
  const [selectDrop, setSelectDrop] = useState('');
 
  const items = [
    {
      key: '1',
      label: <button onClick={() => { setSelectDrop('ASC') }} >A to Z </button>,
    },
    {
      key: '2',
      label: <button  onClick={() => { setSelectDrop('DESC') }} >Z to A</button>,
    },
    
  ];

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/ReportingModuleFilter/GetFilenamesInsideFolderOrdered?foldername=${folderName}&sortOrder=${selectDrop}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setFilesInfolder(response.data)
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [selectDrop]);



  return (
    <>
      <div className='fileContent'>

        <div className='topBarFile'>

          <div className='starting'>
            <p>Home</p>  {" > "} <p style={{marginTop:"0.2vh"}}>Files</p>
          </div>

          <div className='ending' >
            <div style={{ marginLeft: "0vw", marginTop: "0vh", maxHeight: "5vh", height: "4.5vh" }}>
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
          </div>

        </div>
        {gridView ? <FileGrid /> : <FileList />}
      </div>
    </>
  )
}

export default FileContent
