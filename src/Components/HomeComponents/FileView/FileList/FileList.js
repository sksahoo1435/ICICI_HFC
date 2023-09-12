import React, { useContext, useEffect, useState } from 'react'
import SingleRow from './singleRow/SingleRow'
import folder from "../../../../Assets/folderImg.svg";
import "./FileList.css"
import axios from 'axios'
import Statecontext from '../../../Context/Statecontext';
const FileList = () => {

  const { filesinFolder } = useContext(Statecontext);


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

          {filesinFolder && filesinFolder.length > 0 && filesinFolder.map((item,ind) => (

            <SingleRow source={folder} heading={item} dateModified={"27-04-2023"} type={"Folder View"} key={ind}/>

          ))}

        </tbody>
      </table>
    </div>
  )
}

export default FileList
