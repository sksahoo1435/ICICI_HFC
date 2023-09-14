import React, { useContext, useState } from 'react'
import "./singleRow.css"
import FileModal from '../../FIleModal/FileModal';
import Statecontext from '../../../../Context/Statecontext';

const SingleRow = ({ source, heading, dateModified, type }) => {
  const [open, setOpen] = useState(false);
  const {setFileNameTosend} = useContext(Statecontext);
  
  
  return (
    <>
      <tr className='singleRow' onClick={() => { setOpen(true);setFileNameTosend(heading); }}>
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
