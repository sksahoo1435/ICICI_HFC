import React, { useState } from 'react'
import "./singleRow.css"
import download from "../../../../../Assets/material-symbols_download.png";
import FileModal from '../../FIleModal/FileModal';

const SingleRow = ({source,heading,dateModified,type}) => {
  const [open,setOpen] = useState(false);
  return (
    <>
    <tr className='singleRow' onClick={()=>{setOpen(true)}}>
      <td > <div className='nameDiv'><img src={source} className='sourceImg' alt=""/>&nbsp;&nbsp; {heading} </div></td>
      <td>{dateModified}</td>
      <td>{type}</td>
    <td><img src={download} alt=""/></td>

    </tr>
    <FileModal  modalOpen={open} setModalOpen={setOpen} />
    </>
  )
}

export default SingleRow
