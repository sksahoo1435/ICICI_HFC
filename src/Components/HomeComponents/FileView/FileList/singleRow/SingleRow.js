import React, { useState } from 'react'
import "./singleRow.css"
import FileModal from '../../FIleModal/FileModal';

const SingleRow = ({ source, heading, dateModified, type }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className='singleRow' onClick={() => { setOpen(true) }}>
        <td >
          <div className='nameDiv'>
            <img src={source} className='sourceImg' alt="" height={100} width={100} />&nbsp;&nbsp;<p style={{marginTop:"1vh"}}> {heading}</p>
          </div>
        </td>
        <td>{dateModified}</td>
        <td>{type}</td>
      </tr>
      <FileModal modalOpen={open} setModalOpen={setOpen} />
    </>
  )
}

export default SingleRow
