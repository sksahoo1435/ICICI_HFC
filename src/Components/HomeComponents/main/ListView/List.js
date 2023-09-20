import React, { useContext } from 'react'
import "./List.css"
import SingleRow from './singleRow/SingleRow'
import axios from 'axios';
import Statecontext from "../../../Context/Statecontext";


const List = ({ setFileView,updateData }) => {

  const { setFilesInfolder } = useContext(Statecontext);


  const fetchFilesInFolder = async (folderName) => {
    try {
      const getFilesInFolderApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${folderName}`;
      const filesResponse = await axios.get(getFilesInFolderApiUrl, {
        withCredentials: true,
      });

      const files = filesResponse.data;
      setFilesInfolder(files)
      console.log("needded files", files);

    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  return (
    <>
      <div className="listView">
        <table className='myTable'>
          <thead>
            <tr className="HeadingRow">
              <th>Name</th>
              <th>Date Modified</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {updateData.map((item, k) => {
              return (
                <SingleRow heading={item.folderName} onClick={() => { setFileView(true); fetchFilesInFolder(item.folderName); }}
                  dateModified={item.lastModifiedDate} type={"File Folder"} key={k} />
              );
            })}

          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
