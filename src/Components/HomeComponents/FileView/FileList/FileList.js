import React, { useEffect, useState } from 'react'
import SingleRow from './singleRow/SingleRow'
import folder from "../../../../Assets/folderImg.svg";
import "./FileList.css"
import axios from 'axios'
const FileList = () => {
  const [pdata, setPdata] = useState([]);
  const folderName = sessionStorage.getItem("foldername");

  const fetchFilesInFolder = async () => {
    try {
      const getFilesInFolderApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${folderName}`;
      const filesResponse = await axios.get(getFilesInFolderApiUrl, {
        withCredentials: true,
      });

      // const files = filesResponse.data;
      let pro = filesResponse.data;
      sessionStorage.setItem("filename", pro);
      setPdata(pro);

    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  useEffect(() => {
    fetchFilesInFolder();
    console.log("the folder which was selected",folderName)
  }, []);

  return (
    <div className='folderContentList'>
      <table className='myTable' >
        <thead>
          <tr className="HeadingRow">
            <th>Name</th>
            <th>Date Modified</th>
            <th>Type</th>
            <th>&nbsp;</th>
          </tr>

        </thead>
        <tbody>

          {pdata && pdata.length > 0 && pdata.map((item,ind) => (

            <SingleRow source={folder} heading={item} dateModified={"27-04-2023"} type={"Folder View"} key={ind}/>

          ))}

        </tbody>
      </table>
    </div>
  )
}

export default FileList
